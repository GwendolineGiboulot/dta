import template from './fighter.html';
import css from './fighter.css';
import md5 from 'md5';

class controller {

    constructor(FightService) {
        this.FightService = FightService;
    }

    $onInit() {
        this.md5 = md5(this.fighter.email);
    }

    fight(zone) {
        if (!zone) this.FightService.waitingForTarget = true;
        else this.FightService.globalAttack(this.fighter);
    }

    suffer() {
        this.FightService.resolveAttack([this.fighter.email]);
    }

    active() {  
        return this.FightService.attackers[0] === this.fighter.email;
    }

    noMana() {
        return this.fighter.mana < 5;
    }

    isDefender() {
        return !!this.FightService.getFighter(this.fighter.email, 1);
    }

}

export const FighterComponent = {
    bindings: {
        fighter: '<'
    },
    template,
    controller,
}