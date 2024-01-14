class TaskCreator{
    constructor(dto){
    this.user_id = dto.userId,
    this.title = dto.title
    }
};

module.exports = {TaskCreator};