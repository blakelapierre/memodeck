var postMap = {};
var allPosts = [];

var fs = require('fs');

fs.open('posts', 'r', (error, fd) => {
	if (error) return;

	console.log('reading posts');
	fs.readFile(fd, (error, data) => {
		if (error) console.log('error reading posts ok', error);
		else {
			var p = data.toString();
			var lines = p.split('\n');
			lines.forEach(line => {
				try {
					var a = JSON.parse(line);
					a.forEach(post => {
						if (postMap[post.tx] === undefined) {
							allPosts.push(post);
							postMap[post.tx] = post;
						}
					});
				}
				catch (e) {
					console.log('while reading', e, 'line: ', line);
				}
			});

			console.log('read', allPosts.length, 'posts');
		}

		fs.open('posts', 'a', (error, fd) => {
			if (error) console.log('error opening posts file', error);

			start(fd);
		});
	});
});


var {JSDOM} = require('jsdom');
var ws = require('ws');
var WebSocketServer = ws.WebSocketServer;

function start(fd) {
	const wss = new WebSocketServer({ port: 8081 });

	wss.on('connection', function connection(ws) {
	  ws.on('error', console.error);

	  ws.on('message', function message(data) {
	    console.log('received: %s', data);
	  });

	  ws.send('something');
	  ws.send(JSON.stringify(allPosts));
	});

	scrapeForNewPosts();

	function scrapeForNewPosts() {
		getNewPosts()
			.then(function (posts) {
				var newPosts = [];
				posts.forEach(function (post) {
					if (postMap[post.tx] === undefined) {
						newPosts.push(post);
						allPosts.push(post);
						postMap[post.tx] = post;
					}
				});
				console.log(JSON.stringify(newPosts), newPosts.length, 'new posts');
				if (newPosts.length > 0) {
					setTimeout(scrapeForNewPosts, 15 * 1000);
					console.log('will check for new posts in 15 seconds');

					var message = JSON.stringify(newPosts);
					fs.appendFile(fd, message + '\n', () => {});
					wss.clients.forEach(function each(client) {
				      if (client.readyState === ws.OPEN) {
				        client.send(message);
				      }
				    });
				}
				else {
					setTimeout(scrapeForNewPosts, 60 * 1000);
					console.log('will check for new posts in 60 seconds');
				}
			})
			.catch(function (error) {
				console.log('error getting new posts', error);
				setTimeout(scrapeForNewPosts, 60 * 1000);
				console.log('will check for new posts in 60 seconds');
			});
	}
}

function scrapePost(postNode) {
	var post = {tx: postNode.attributes['data-tx-hash'].textContent};

	var header = postNode.querySelector('.post-header');
	var nameNode = header.querySelector('.name');
	
	var identicon = nameNode.querySelector('.mini-profile-name .profile-pic-24');
	var name = nameNode.querySelector('.mini-profile-name a.profile');
	post.name = {link: name.href, text: name.textContent};
	post.time = nameNode.querySelector('.time-ago').title;

	post.message = postNode.querySelector('.message').textContent;

	var likeInfo = postNode.querySelector('.like-info span');
	if (likeInfo) post.likes = parseInt(likeInfo.textContent.trim()) || 0;

	var tipButton = postNode.querySelector('.tip-button');
	if (tipButton) post.tips = parseInt(tipButton.textContent.trim()) || 0;

	return post;
}

function getNewPosts() {
	return JSDOM
			.fromURL("https://memo.cash/posts/new")
			.then(function (dom) {
				var body = dom.window.document.body;

				var postsNodes = dom.window.document.querySelectorAll('.post');

				/*
					.post_header
						.name
							.mini-profile-name
								img.identicon [src]
								a.profile [href & innerText]
							a.time-ago [title]
					.message [innerText]
				
				*/

				return Array.prototype.map.call(postsNodes, scrapePost);
			});
}


//determine new posts
//schedule new fetch
//send to websockets
//write to file


//import { WebSocketServer } from 'ws';
