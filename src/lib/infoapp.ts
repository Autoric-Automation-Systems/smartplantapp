interface InfoAppInterface {
    name: string;
    site: string;
    version: string;
    description: string;
    url: string;
}

const infoAPP: InfoAppInterface = {
    name: "Smart Plant",
    site: "smartplant.app.br",
    version: "1.0",
    description: "Sistema integrado de telemetria para indústria, comercio e residências.",
    url: "https://smartplant.app.br",
}

export default infoAPP;