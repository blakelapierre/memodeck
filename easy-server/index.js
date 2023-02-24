var {JSDOM} = require('jsdom');

var postMap = {};

scrapeForNewPosts();

function scrapeForNewPosts() {
	getNewPosts()
		.then(function (posts) {
			var newPosts = [];
			posts.forEach(function (post) {
				if (postMap[post.tx] === undefined) {
					newPosts.push(post);
					postMap[post.tx] = post;
				}
			});
			console.log(JSON.stringify(newPosts), newPosts.length, 'new posts');
			if (newPosts.length > 0) {
				setTimeout(scrapeForNewPosts, 15 * 1000);
				console.log('will check for new posts in 15 seconds');
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

function scrapePost(postNode) {
	var post = {tx: postNode.attributes['data-tx-hash'].textContent};

	var header = postNode.querySelector('.post-header');
	var nameNode = header.querySelector('.name');
	
	var identicon = nameNode.querySelector('.mini-profile-name .profile-pic-24');
	var name = nameNode.querySelector('.mini-profile-name a.profile');
	post.name = {link: name.href, text: name.textContent};
	post.time = nameNode.querySelector('.time-ago').title;


	post.message = postNode.querySelector('.message').textContent;

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