class Podcast {
    constructor(obj) {
        obj =  obj || {}
        this.name = obj.name || ''
        this.link = obj.link || ''
        this.author = obj.author || ''
        this.subject = obj.subject || '',
        this.created_at = obj.created_at || ''
        this.image = obj.image || ''
        this.favorited_at = obj.favorited_at
    }
}

module.exports = Podcast;