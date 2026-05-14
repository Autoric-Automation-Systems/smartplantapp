import { Container } from '../../components/Container';
import { Metadata } from "next";
import infoAPP from "@/lib/infoapp";

export const metadata: Metadata = {
    title: `Privacy Policy | ${infoAPP.name}`,
    description: infoAPP.description,
};

export default function PrivacyPage() {
    return (
        <Container className="py-12">
            <article className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4 mb-12">
                    <div className="text-5xl mb-4">🔒</div>
                    <h1 className="text-4xl font-bold">Declaração de Privacidade</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Última atualização: 13 de maio de 2026
                    </p>
                </div>

                {/* Introduction */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">1. Introdução</h2>
                    <p>
                        A <strong>Autoric Automação e Sistemas</strong> está comprometida em proteger sua privacidade.
                        Esta Declaração de Privacidade explica como coletamos, usamos, divulgamos e protegemos seus dados
                        pessoais quando você utiliza nosso aplicativo <strong>Smart Plant App</strong>.
                    </p>
                    <p>
                        Esta política está em conformidade com a <strong>Lei Geral de Proteção de Dados Pessoais
                            (LGPD - Lei nº 13.709/2018)</strong> e regulamentações de proteção de dados aplicáveis.
                    </p>
                </section>

                {/* Dados Coletados */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">2. Dados Que Coletamos</h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">2.1 Dados de Identificação Pessoal</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                                <li>Nome completo</li>
                                <li>Endereço de email</li>
                                <li>Número de telefone</li>
                                <li>Endereço físico</li>
                                <li>Dados de identificação (CPF, CNPJ)</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">2.2 Dados de Autenticação</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                                <li>Senhas (armazenadas com hash bcrypt)</li>
                                <li>Informações de autenticação multifator</li>
                                <li>Logs de acesso</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">2.3 Dados de Telemetria</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                                <li>Leituras de temperatura e umidade</li>
                                <li>Níveis de tanques e reservatórios</li>
                                <li>Medições de fluxo de fluidos</li>
                                <li>Estados de produção e contadores</li>
                                <li>Data e hora das leituras</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">2.4 Dados de Pagamento</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Todos os pagamentos são processados exclusivamente via <strong>Stripe</strong> com conformidade
                                <strong> PCI DSS</strong>. Não armazenamos números completos de cartão.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Base Legal */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">3. Base Legal para Tratamento</h2>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg space-y-3">
                        <p><strong>Consentimento Informado:</strong> Criação de conta e comunicações</p>
                        <p><strong>Cumprimento Legal:</strong> Conformidade fiscal e regulatória</p>
                        <p><strong>Execução de Contrato:</strong> Provimento do serviço contratado</p>
                        <p><strong>Interesse Legítimo:</strong> Segurança, análise e melhorias</p>
                    </div>
                </section>

                {/* Seus Direitos */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">4. Seus Direitos como Titular</h2>
                    <p>Conforme a LGPD, você tem direito a:</p>
                    <div className="grid gap-3">
                        <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-xl">📋</span>
                            <div>
                                <p className="font-semibold">Direito de Acesso</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Obter informações sobre seus dados</p>
                            </div>
                        </div>
                        <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-xl">✏️</span>
                            <div>
                                <p className="font-semibold">Direito de Correção</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Solicitar correção de dados inexatos</p>
                            </div>
                        </div>
                        <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-xl">🗑️</span>
                            <div>
                                <p className="font-semibold">Direito de Exclusão</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Solicitar deleção de dados</p>
                            </div>
                        </div>
                        <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-xl">📤</span>
                            <div>
                                <p className="font-semibold">Direito de Portabilidade</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Receber dados em formato estruturado</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Segurança */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">5. Segurança de Dados</h2>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                            <p>Criptografia SSL/TLS para transmissão de dados</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                            <p>Hash bcrypt com salt aleatório para senhas</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                            <p>Autenticação multifator (MFA) disponível</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                            <p>Proteção contra XSS, CSRF e SQL Injection</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                            <p>Auditorias de segurança regulares</p>
                        </div>
                    </div>
                </section>

                {/* Retenção */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">6. Retenção de Dados</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-300 dark:border-gray-600">
                                    <th className="text-left py-2 px-3">Tipo de Dado</th>
                                    <th className="text-left py-2 px-3">Retenção</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="py-2 px-3">Dados de conta ativa</td>
                                    <td className="py-2 px-3">Durante a vigência da conta</td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="py-2 px-3">Transações</td>
                                    <td className="py-2 px-3">7 anos (obrigação fiscal)</td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="py-2 px-3">Telemetria</td>
                                    <td className="py-2 px-3">30-365 dias (configurável)</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-3">Logs de segurança</td>
                                    <td className="py-2 px-3">90 dias</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Contato */}
                <section className="space-y-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold">7. Contato - Encarregado de Proteção de Dados</h2>
                    <div className="space-y-2">
                        <p>📧 <strong>Email:</strong> autoricbr@gmail.com</p>
                        <p>🏢 <strong>Endereço:</strong> Rua dos Dados, 123, São Paulo - SP, Brasil</p>
                    </div>
                    <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded border border-blue-200 dark:border-blue-800">
                        <p className="text-sm">
                            Se você tiver preocupações sobre o tratamento de seus dados, pode registrar uma reclamação
                            junto à <strong>Autoridade Nacional de Proteção de Dados (ANPD)</strong> em
                            <a href="https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                                www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd
                            </a>
                        </p>
                    </div>
                </section>

                {/* Alterações */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">8. Alterações a Esta Política</h2>
                    <p>
                        Podemos atualizar esta Declaração de Privacidade periodicamente. Mudanças significativas
                        serão notificadas por email ou aviso no site.
                    </p>
                </section>

                {/* Footer */}
                <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                        Sua privacidade e segurança são nossas prioridades.
                    </p>
                </div>
            </article>
        </Container>
    );
}