import { Container } from '../../components/Container';
import { Metadata } from "next";
import infoAPP from "@/lib/infoapp";

export const metadata: Metadata = {
    title: `Security Policy`,
    description: "Security Policy for Smart Plant - Learn how we implement security measures to protect your data and ensure a safe experience when using our app. Understand our commitment to maintaining the highest standards of security.",
};
export default function SecurityPage() {
    return (
        <Container className="py-12">
            <article className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4 mb-12">
                    <div className="text-5xl mb-4">🛡️</div>
                    <h1 className="text-4xl font-bold">Política de Segurança</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Última atualização: 13 de maio de 2026
                    </p>
                </div>

                {/* Introduction */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">1. Introdução</h2>
                    <p>
                        A <strong>Autoric Automação e Sistemas</strong> leva a segurança da informação a sério.
                        Esta Política de Segurança descreve as medidas técnicas e organizacionais implementadas
                        para proteger seus dados no <strong>Smart Plant App</strong>.
                    </p>
                    <p>
                        Adotamos as melhores práticas da indústria, incluindo conformidade com
                        <strong> ISO 27001</strong>, <strong>OWASP Top 10</strong> e regulamentações
                        aplicáveis de proteção de dados.
                    </p>
                </section>

                {/* Criptografia */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">2. Criptografia</h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">2.1 Dados em Trânsito</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                                <li>Protocolo TLS 1.3 para todas as comunicações</li>
                                <li>Certificados SSL/TLS com validação estendida</li>
                                <li>Cifras fortes e modernas (ECDHE, AES-GCM)</li>
                                <li>HSTS (HTTP Strict Transport Security) habilitado</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">2.2 Dados em Repouso</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                                <li>Criptografia AES-256 para dados no banco de dados</li>
                                <li>Chaves gerenciadas via AWS KMS ou equivalente</li>
                                <li>Senhas armazenadas com bcrypt (custo 12+)</li>
                                <li>Tokens JWT com assinatura RS256</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Autenticação */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">3. Autenticação e Controle de Acesso</h2>

                    <div className="grid gap-3">
                        <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-xl">🔑</span>
                            <div>
                                <p className="font-semibold">Autenticação Multifator (MFA)</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Suporte a TOTP, SMS e chaves de segurança FIDO2/WebAuthn
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-xl">🔐</span>
                            <div>
                                <p className="font-semibold">Política de Senhas</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Mínimo 8 caracteres, exigência de maiúsculas, minúsculas, números e símbolos
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-xl">🚫</span>
                            <div>
                                <p className="font-semibold">Bloqueio de Conta</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Bloqueio temporário após 5 tentativas de login inválidas
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-xl">🔒</span>
                            <div>
                                <p className="font-semibold">Controle de Acesso Baseado em Papéis (RBAC)</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Acesso granular com privilégio mínimo por função do usuário
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Segurança da Aplicação */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">4. Segurança da Aplicação</h2>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                            <p><strong>Proteção XSS:</strong> Sanitização de entrada e escape de saída</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                            <p><strong>Proteção CSRF:</strong> Tokens anti-CSRF em toda requisição</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                            <p><strong>SQL Injection:</strong> ORM seguro e prepared statements</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                            <p><strong>Rate Limiting:</strong> Limitação de requisições por IP e usuário</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                            <p><strong>Content Security Policy:</strong> Headers CSP, X-Frame-Options e X-Content-Type-Options</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                            <p><strong>Dependências:</strong> Auditoria contínua com Dependabot e Snyk</p>
                        </div>
                    </div>
                </section>

                {/* Infraestrutura */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">5. Segurança da Infraestrutura</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-300 dark:border-gray-600">
                                    <th className="text-left py-2 px-3">Componente</th>
                                    <th className="text-left py-2 px-3">Medida de Segurança</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="py-2 px-3">Servidores</td>
                                    <td className="py-2 px-3">Firewall, WAF, segmentação de rede</td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="py-2 px-3">Banco de Dados</td>
                                    <td className="py-2 px-3">Rede privada, criptografia, backup diário</td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="py-2 px-3">Armazenamento</td>
                                    <td className="py-2 px-3">Bucket privado, chaves KMS, logs de acesso</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-3">CDN</td>
                                    <td className="py-2 px-3">Proteção DDoS, WAF, edge security</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Monitoramento */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">6. Monitoramento e Resposta a Incidentes</h2>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg space-y-3">
                        <div className="flex gap-3">
                            <span className="text-xl">👁️</span>
                            <div>
                                <p className="font-semibold">Monitoramento 24/7</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Sistema de detecção de intrusão (IDS) monitorando tráfego e logs
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-xl">📊</span>
                            <div>
                                <p className="font-semibold">SIEM</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Correlação de eventos e alertas em tempo real
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-xl">🚨</span>
                            <div>
                                <p className="font-semibold">Plano de Resposta a Incidentes</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Processo documentado com tempos de resposta definidos (SLA)
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-xl">📋</span>
                            <div>
                                <p className="font-semibold">Registro de Auditoria</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Logs imutáveis de todas as operações sensíveis
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Conformidade */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">7. Conformidade e Certificações</h2>

                    <div className="grid gap-3">
                        <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-xl">🇧🇷</span>
                            <div>
                                <p className="font-semibold">LGPD</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Conformidade com Lei Geral de Proteção de Dados
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-xl">🌐</span>
                            <div>
                                <p className="font-semibold">ISO 27001</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Sistema de Gestão de Segurança da Informação
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-xl">💳</span>
                            <div>
                                <p className="font-semibold">PCI DSS</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Padrão de Segurança para Dados de Cartão (Stripe)
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-xl">🛡️</span>
                            <div>
                                <p className="font-semibold">OWASP</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Seguimos OWASP Top 10 para desenvolvimento seguro
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vulnerabilidades */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">8. Programa de Divulgação de Vulnerabilidades</h2>

                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h3 className="font-semibold mb-3">🔍 Reporte Responsável de Vulnerabilidades</h3>
                        <p className="mb-3">
                            Se você descobrir uma vulnerabilidade de segurança no Smart Plant App,
                            agradecemos sua ajuda em reportá-la de forma responsável:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Reporte por email: <strong>security@smartplant.app</strong></li>
                            <li>Inclua detalhes da vulnerabilidade (PDF preferido)</li>
                            <li>Não explore a vulnerabilidade além do necessário</li>
                            <li>Não acesse dados de outros usuários</li>
                            <li>Aguardar confirmação antes de divulgar publicamente</li>
                        </ul>
                        <div className="mt-4 flex items-center gap-2 text-sm bg-white dark:bg-gray-800 p-3 rounded">
                            <span className="text-green-600 font-bold">⏱️</span>
                            <p>Compromisso de resposta em até <strong>48 horas úteis</strong></p>
                        </div>
                    </div>
                </section>

                {/* Atualizações */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">9. Atualizações de Segurança</h2>
                    <div className="space-y-3">
                        <div className="flex gap-3">
                            <span className="text-2xl">🔄</span>
                            <div>
                                <p className="font-semibold">Atualizações Automáticas</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Dependências e patches de segurança aplicados automaticamente
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-2xl">📢</span>
                            <div>
                                <p className="font-semibold">Notificações de Segurança</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Usuários notificados sobre atualizações críticas de segurança
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-2xl">🔬</span>
                            <div>
                                <p className="font-semibold">Testes de Penetração</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Auditorias de segurança realizadas trimestralmente por terceiros
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Data Protection Officer */}
                <section className="space-y-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold">10. Encarregado de Segurança</h2>
                    <div className="space-y-2">
                        <p>🔐 <strong>Reporte Vulnerabilidades:</strong> autoricbr@gmail.com</p>
                    </div>
                    <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded border border-blue-200 dark:border-blue-800">
                        <p className="text-sm">
                            Para questões urgentes de segurança, entre em contato imediatamente.
                            Nosso time de segurança está disponível 24/7 para emergências.
                        </p>
                    </div>
                </section>

                {/* Footer */}
                <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                        Sua segurança é nossa prioridade. Estamos comprometidos em proteger seus dados.
                    </p>
                </div>
            </article>
        </Container>
    );
}