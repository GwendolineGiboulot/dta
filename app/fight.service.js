import { random } from "lodash";

export class FightService {
    constructor(PeerService, $timeout, $rootScope) {
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.PeerService = PeerService;

        this.PeerService.init(this.onDataReceived.bind(this));


        window.f = this;
        this.teams = [
        {
            name: "ByteClub",
            fighters: [
            {
                email: "tmoyse@gmail.com",
                life: 10,
                mana: 10,
                attack: [3, 5]
            },
            {
                email: "delapouite@gmail.com",
                life: 10,
                mana: 10,
                attack: [3, 5]
            },
            {
                email: "naholyr@gmail.com",
                life: 10,
                mana: 10,
                attack: [3, 5]
            }
            ]
        },
        {
            name: "P. de code",
            fighters: [
            {
                email: "finalboss@esn.fr",
                life: 100,
                mana: 0,
                attack: [1, 8]
            }
            ]
        }
        ];

        this.round = 0;
        this.waitingForTarget = false;
        this.nextRound();
    }

    onDataReceived(data) {
        this.$rootScope.$apply(() => {
            this.teams = data.teams;
            this.round = data.round;
            this.attackers = data.attackers;
        });
    }

    nextRound() {
        this.updateMana();
        this.round++;
        this.attackers = this.getFighters().map(f => f.email);

        if (this.PeerService.conn) {
            this.PeerService.send({
                type: "gameState",
                teams: this.teams,
                round: this.round,
                attackers: this.attackers
            });
        }



    }

    getDamage(email) {
        const fighter = this.getFighter(email);
        return fighter ? random(...fighter.attack) : 0;
    }

    getFighter(email, side = 0) {
        // att 0 to look in attacker team, 1 to look in def
        return this.getFighters(side).find(f => f.email === email);
    }

    getFighters(side = 0) {
        return this.teams[(this.round + side) % 2].fighters.filter(
            f => f.life > 0
            );
    }

    globalAttack(fighter) {
        if (fighter.mana < 5) return;
        fighter.mana -= 5;
        this.resolveAttack(this.getFighters(1).map(f => f.email));
    }

    resolveAttack(targets) {
        const activeAttacker = this.attackers.shift();
        const damages = this.getDamage(activeAttacker);
        targets.forEach(email => {
            let fighter = this.getFighter(email, 1);
            fighter.life = Math.max(fighter.life - damages, 0);
        });
        this.waitingForTarget = false;
        if (this.attackers.length === 0) this.nextRound();
    }

    updateMana() {
        this.teams.forEach(team =>
            team.fighters.forEach(f => f.mana = Math.min(10, f.mana + 1))
            );
    }
}
