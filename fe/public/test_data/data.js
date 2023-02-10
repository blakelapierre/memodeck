const Data = {
	posts: [
        makePost('blake', 'test'),
        makePost('blake', 'test2'),
        makePost('maxtuno', 'wut')
    ]
};

export default Data;

function makePost(author, message) {
    return {author, message};
}