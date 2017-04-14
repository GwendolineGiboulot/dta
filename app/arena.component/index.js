import template from './arena.html';

class controller {

    constructor(FightService) {
        this.FightService = FightService;
    }

}

export const ArenaComponent = {
    controller,
    template,
}