interface InfoAppInterface {
    name: string;
    site: string;
    version: string;
    description: string;
}

const infoAPP: InfoAppInterface = {
    name: "Smart Plant",
    site: "smartplant.app.br",
    version: "1.0",
    description: "Sistema integrado de telemetria para plantas residenciais, comerciais e industriais"
}

export default infoAPP;