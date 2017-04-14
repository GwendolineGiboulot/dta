import  angular from 'angular';

import { FighterComponent } from './fighter.component';
import { ArenaComponent } from './arena.component';
import { FightService } from './fight.service';
import { PeerService } from './peerService';

angular.module('app', [])

.service('FightService', FightService)
.service('PeerService', PeerService)
.component('dtaFighter', FighterComponent)
.component('dtaArena', ArenaComponent)
.controller('PeerController', class PeerController {

		constructor(PeerService,FightService) {
			this.PeerService = PeerService;
			this.FightService = FightService;
		}


		connect() {
			this.PeerService.connect(this.FightService.onDataReceived.bind(this.FightService));
		}

})
