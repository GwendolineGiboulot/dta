export class PeerService {
    constructor($rootScope) {
        this.$rootScope = $rootScope;
    }

    init(cb) {
        this.peer = new Peer({
            key: "hk4znsr4521vpldi"
        });
        this.peer.on("open", id => {
            this.$rootScope.$apply(() => {
                this.peerId = id;
            });
        });

        this.peer.on("connection", conn => {
            console.log("conn", conn);
            this.conn = conn;
            this.conn.on("data", data => {
                cb(data);
            });
        });
    }

    connect(cb) {
        this.conn = this.peer.connect(this.opponentPeerId);

        this.conn.on("open", () => {
            this.conn.on("data", data => {
                cb(data);
            });
        });
    }

    send(Object) {
        this.conn.send(Object);
    }
}
