import { Container } from '../../components/Container';
import { Metadata } from "next";
import infoAPP from "@/lib/infoapp";

export const metadata: Metadata = {
    title: `Terms of Service`,
    description: "Terms of Service for Smart Plant - Understand the rules and guidelines for using our app. Learn about your rights and responsibilities when accessing and using the Smart Plant Service.",
};
export default function TermsOfServicePage() {
    return (
        <Container className="py-12">
            <article className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4 mb-12">
                    <div className="text-5xl mb-4">📋</div>
                    <h1 className="text-4xl font-bold">Termos de Serviço</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Última atualização: 13 de maio de 2026
                    </p>
                </div>

                {/* Introduction */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">1. Aceitação dos Termos</h2>
                    <p>
                        Ao acessar e usar o <strong>Smart Plant App</strong>, você concorda em estar vinculado por estes
                        Termos de Serviço. Se você não concorda, não continue usando o Serviço.
                    </p>
                    <p>
                        A <strong>Autoric Automação e Sistemas</strong> reserva o direito de modificar estes Termos a
                        qualquer momento. Continuação do uso após modificações constitui aceitação dos Termos revisados.
                    </p>
                </section>

                {/* Elegibilidade */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">2. Elegibilidade</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">2.1 Capacidade Legal</h3>
                            <p>Você deve ter pelo menos <strong>18 anos de idade</strong> para usar este Serviço.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">2.2 Menores de Idade</h3>
                            <p>
                                Menores de 18 anos só podem usar com supervisão e consentimento de responsável legal,
                                que é integralmente responsável pelo uso.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Criação de Conta */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">3. Criação e Manutenção de Conta</h2>
                    <div className="space-y-3">
                        <div className="flex gap-3">
                            <span className="text-xl">🔑</span>
                            <div>
                                <p className="font-semibold">Sua Responsabilidade</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Você é responsável pela confidencialidade de sua senha e todas as atividades sob sua conta
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-xl">✔️</span>
                            <div>
                                <p className="font-semibold">Informações Precisas</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Concorda em fornecer informações verdadeiras e manter dados atualizados
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-xl">🚨</span>
                            <div>
                                <p className="font-semibold">Notificação de Acesso Não Autorizado</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Notifique-nos imediatamente sobre qualquer acesso suspeito
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Uso Autorizado */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">4. Uso Autorizado do Serviço</h2>
                    <p>Você <strong>NÃO</strong> pode:</p>
                    <div className="space-y-3">
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border-l-4 border-red-500">
                            <p className="font-semibold">Atividades Ilegais</p>
                            <p className="text-sm">Usar para atividades ilegais, fraudulentas ou prejudiciais</p>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border-l-4 border-red-500">
                            <p className="font-semibold">Segurança</p>
                            <p className="text-sm">Explorar vulnerabilidades, contornar segurança ou ataques (DoS/DDoS)</p>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border-l-4 border-red-500">
                            <p className="font-semibold">Propriedade Intelectual</p>
                            <p className="text-sm">Copiar, roubar ou reproduzir conteúdo protegido</p>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border-l-4 border-red-500">
                            <p className="font-semibold">Abuso</p>
                            <p className="text-sm">Assediar usuários, enviar spam, malware ou conteúdo prejudicial</p>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border-l-4 border-red-500">
                            <p className="font-semibold">Dados e Privacidade</p>
                            <p className="text-sm">Coletar dados de terceiros sem autorização</p>
                        </div>
                    </div>
                </section>

                {/* Propriedade Intelectual */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">5. Propriedade Intelectual</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">5.1 Propriedade da Empresa</h3>
                            <p>
                                O Serviço, incluindo código, design, gráficos, ícones e funcionalidades, é propriedade
                                exclusiva da Autoric, protegido por leis de direito autoral e marcas registradas.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">5.2 Seu Conteúdo</h3>
                            <p>
                                Você retém propriedade de conteúdo que cria, mas concede à Empresa licença para usar,
                                reproduzir e processar seus dados para melhorar o Serviço.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Descrição do Serviço */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">6. Descrição e Limitações do Serviço</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">6.1 O Que é o Serviço</h3>
                            <p>
                                Plataforma de <strong>monitoramento e telemetria em tempo real</strong> que permite coleta
                                de dados de sensores, visualização em dashboards, alertas configuráveis, análise e relatórios.
                            </p>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded">
                            <h3 className="text-xl font-semibold mb-2">6.2 Sem Garantias</h3>
                            <p className="font-bold mb-2">O Serviço é fornecido "CONFORME ESTÁ DISPONIVEL" e "CONFORME DISPONÍVEL"</p>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Sem garantia de atender seus requisitos específicos</li>
                                <li>Sem garantia de acesso ininterrupto ou sem erros</li>
                                <li>Sem garantia de segurança ou ausência de malware</li>
                                <li>Manutenção programada pode causar indisponibilidade</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Responsabilidade */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">7. Responsabilidade e Indenização</h2>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded border-l-4 border-red-500">
                        <h3 className="text-xl font-semibold mb-3">7.1 Limitação de Responsabilidade</h3>
                        <p className="font-bold mb-2">NÓS NÃO SOMOS RESPONSÁVEIS POR:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Danos indiretos, incidentais ou consequenciais</li>
                            <li>Perda de dados, receita ou lucros</li>
                            <li>Interrupção de negócios</li>
                            <li>Qualquer dano causado por uso indevido</li>
                        </ul>
                        <p className="text-sm mt-3 font-semibold">
                            Responsabilidade máxima: Valor pago nos últimos 12 meses ou R$ 500,00 (o que for menor)
                        </p>
                    </div>
                </section>

                {/* Preços e Cobrança */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">8. Preços, Cobrança e Pagamento</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">8.1 Moeda e Ciclo</h3>
                            <p>Preços em <strong>Real Brasileiro (R$)</strong>. Cobrança mensal ou anual conforme plano.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">8.2 Métodos de Pagamento</h3>
                            <p className="mb-2">Aceitamos:</p>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Cartão de crédito (Visa, Mastercard, Elo, American Express)</li>
                                <li>Transferência bancária</li>
                                <li>PIX</li>
                            </ul>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                Todos processados pela <strong>Stripe</strong> com conformidade <strong>PCI DSS</strong>
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">8.3 Reembolsos</h3>
                            <p>Oferecemos <strong>garantia de 7 dias</strong> após compra inicial.</p>
                        </div>
                    </div>
                </section>

                {/* Rescisão */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">9. Cancelamento e Rescisão</h2>
                    <div className="space-y-3">
                        <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-xl">🚫</span>
                            <div>
                                <p className="font-semibold">Cancelamento por Você</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Qualquer momento. Cancela no final do período de cobrança vigente
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-xl">🛑</span>
                            <div>
                                <p className="font-semibold">Rescisão pela Empresa</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Podemos suspender se violar estes Termos, fraude, segurança ou não-pagamento
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Conformidade */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">10. Conformidade Legal</h2>
                    <div className="space-y-3">
                        <div className="flex gap-3">
                            <span className="text-xl">⚖️</span>
                            <div>
                                <p className="font-semibold">LGPD</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Conformidade total com Lei Geral de Proteção de Dados</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-xl">🛡️</span>
                            <div>
                                <p className="font-semibold">Código de Defesa do Consumidor</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Direitos do consumidor respeitados integralmente</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-xl">📋</span>
                            <div>
                                <p className="font-semibold">Conformidade Fiscal</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Você é responsável por obrigações fiscais locais</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Lei Aplicável */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">11. Lei Aplicável e Resolução de Disputas</h2>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
                        <p className="mb-2">
                            <strong>Lei Aplicável:</strong> Leis da República Federativa do Brasil
                        </p>
                        <p className="mb-2">
                            <strong>Jurisdição:</strong> Tribunais de São Paulo, Brasil
                        </p>
                        <p className="text-sm">
                            Antes de ação legal, ambas as partes concordam em tentar resolução informal e mediação.
                        </p>
                    </div>
                </section>

                {/* Suporte */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">12. Suporte ao Cliente</h2>
                    <div className="space-y-2">
                        <p><strong>Email:</strong> autoricbr@gmail.com</p>
                        <p><strong>Horário:</strong> Segunda a sexta, 9h-18h (Brasília)</p>
                        <p><strong>Resposta:</strong> Até 24 horas úteis</p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                        Suporte inclui problemas técnicos, dúvidas de uso e problemas de acesso.
                    </p>
                </section>

                {/* Modificações */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">13. Modificações aos Termos</h2>
                    <p>
                        Mudanças materiais serão notificadas por email com <strong>30 dias</strong> para revisão
                        antes de entrar em vigor. Continuação do uso = aceitação dos Termos modificados.
                    </p>
                </section>

                {/* Contato */}
                <section className="space-y-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold">14. Contato</h2>
                    <div className="space-y-2">
                        <p>📧 <strong>Email:</strong> autoricbr@gmail.com</p>
                        <p>🌐 <strong>Website:</strong> <a href="https://autoric.com.br" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">autoric.com.br</a></p>
                        <p>🌐 <strong>Smart Plant:</strong> <a href="https://smartplant.app.br" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">smartplant.app.br</a></p>
                    </div>
                </section>

                {/* Footer */}
                <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Ao usar nosso Serviço, você concorda em estar vinculado por estes Termos.
                    </p>
                </div>
            </article>
        </Container>
    );
}