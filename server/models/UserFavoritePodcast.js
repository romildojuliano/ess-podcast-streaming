class UserFavoritePodcast {
    constructor(username, podcast, created_at = new Date().toISOString()) {
        this.username = username 
        this.created_at = created_at 
        this.podcast = podcast 
    }
}

module.exports = UserFavoritePodcast;