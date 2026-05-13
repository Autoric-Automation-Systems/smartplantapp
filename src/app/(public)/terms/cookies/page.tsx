'use client';

import { Container } from '../../components/Container';
import { Footer } from '../../components/Footer';

export default function CookiePolicyPage() {
    return (
        <Container className="py-12">
            <article className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4 mb-12">
                    <div className="text-5xl mb-4">🍪</div>
                    <h1 className="text-4xl font-bold">Política de Cookies</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Última atualização: 13 de maio de 2026
                    </p>
                </div>

                {/* O Que São */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">1. O Que São Cookies?</h2>
                    <p>
                        Cookies são pequenos arquivos de texto armazenados no seu navegador ou dispositivo.
                        Eles permitem que websites lembrarem informações sobre você, como preferências e dados de sessão.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
                        <p className="font-semibold mb-2">Um cookie típico contém:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li><strong>Nome:</strong> Identificador único</li>
                            <li><strong>Valor:</strong> Dados armazenados</li>
                            <li><strong>Domínio:</strong> Site que configurou o cookie</li>
                            <li><strong>Expiração:</strong> Quando o cookie será deletado</li>
                        </ul>
                    </div>
                </section>

                {/* Por Que Usamos */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">2. Por Que Usamos Cookies?</h2>
                    <div className="space-y-3">
                        <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-xl">🔐</span>
                            <div>
                                <p className="font-semibold">Funcionalidade Essencial</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Manter você conectado, lembrar preferências</p>
                            </div>
                        </div>
                        <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-xl">📊</span>
                            <div>
                                <p className="font-semibold">Análise e Performance</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Entender como você usa o serviço</p>
                            </div>
                        </div>
                        <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-xl">📢</span>
                            <div>
                                <p className="font-semibold">Marketing</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Rastrear campanhas e conteúdo relevante</p>
                            </div>
                        </div>
                        <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-xl">🛡️</span>
                            <div>
                                <p className="font-semibold">Segurança</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Detectar atividades suspeitas, autenticação</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tipos de Cookies */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">3. Tipos de Cookies Usados</h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-green-600 dark:text-green-400">✓ Essenciais (Consentimento Não Requerido)</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-300 dark:border-gray-600">
                                            <th className="text-left py-2 px-3">Nome</th>
                                            <th className="text-left py-2 px-3">Propósito</th>
                                            <th className="text-left py-2 px-3">Duração</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="py-2 px-3"><code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">authjs.csrf-token</code></td>
                                            <td className="py-2 px-3">Token CSRF de segurança</td>
                                            <td className="py-2 px-3">Sessão</td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="py-2 px-3"><code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">authjs.session-token</code></td>
                                            <td className="py-2 px-3">Token de sessão autenticada</td>
                                            <td className="py-2 px-3">30 dias</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-3"><code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">smartplant-session-id</code></td>
                                            <td className="py-2 px-3">ID único de sessão</td>
                                            <td className="py-2 px-3">Sessão</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                ⚠️ <strong>Se bloqueados:</strong> Você não conseguirá fazer login ou usar o serviço.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Preferência (Consentimento Implícito)</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-300 dark:border-gray-600">
                                            <th className="text-left py-2 px-3">Nome</th>
                                            <th className="text-left py-2 px-3">Propósito</th>
                                            <th className="text-left py-2 px-3">Duração</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="py-2 px-3"><code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">smartplant-theme</code></td>
                                            <td className="py-2 px-3">Tema preferido (claro/escuro)</td>
                                            <td className="py-2 px-3">1 ano</td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="py-2 px-3"><code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">smartplant-language</code></td>
                                            <td className="py-2 px-3">Idioma preferido</td>
                                            <td className="py-2 px-3">1 ano</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-3"><code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">smartplant-sidebar-state</code></td>
                                            <td className="py-2 px-3">Estado da sidebar</td>
                                            <td className="py-2 px-3">30 dias</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-orange-600 dark:text-orange-400">Analytics (Consentimento Explícito)</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                <strong>Google Analytics:</strong> Análise de uso, páginas visitadas, duração da sessão
                            </p>
                            <p className="text-sm">Duração: 2 anos</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">Marketing (Consentimento Explícito)</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                <strong>Facebook Pixel, Stripe:</strong> Rastreamento de conversão e comportamento de compra
                            </p>
                            <p className="text-sm">Duração: 3 meses - 1 ano</p>
                        </div>
                    </div>
                </section>

                {/* Gerenciamento */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">4. Como Gerenciar Cookies</h2>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded">
                        <h3 className="font-semibold mb-3">🌐 Chrome</h3>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                            <li>Menu (⋮) → Configurações</li>
                            <li>Privacidade e segurança → Cookies</li>
                            <li>Gerenciar todos os cookies</li>
                            <li>Pesquise "smartplant" e delete conforme desejado</li>
                        </ol>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded">
                        <h3 className="font-semibold mb-3">🦊 Firefox</h3>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                            <li>Menu (≡) → Configurações</li>
                            <li>Privacidade & Segurança</li>
                            <li>Cookies e dados do site</li>
                            <li>Procure smartplant.app.br e delete</li>
                        </ol>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded">
                        <h3 className="font-semibold mb-3">🚫 Desabilitar Cookies</h3>
                        <p className="text-sm">
                            Você pode desabilitar cookies, mas isso afetará funcionalidade:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                            <li>Não conseguirá fazer login</li>
                            <li>Perderá preferências personalizadas</li>
                            <li>Algumas features não funcionarão</li>
                        </ul>
                    </div>
                </section>

                {/* Consentimento */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">5. Consentimento de Cookie</h2>
                    <div className="space-y-3">
                        <div className="flex gap-3">
                            <span className="text-2xl">📋</span>
                            <div>
                                <p className="font-semibold">Banner de Consentimento</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Ao primeira visita, exibimos um banner informando sobre cookies.
                                    Você pode aceitar todos, rejeitar não-essenciais ou personalizar.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-2xl">⚙️</span>
                            <div>
                                <p className="font-semibold">Renovação de Consentimento</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Se não interagir com o banner por 12 meses, ele reaparecerá.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-2xl">🚫</span>
                            <div>
                                <p className="font-semibold">Revogação</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Você pode revogar consentimento a qualquer tempo através de
                                    "Preferências de Cookie" no footer ou configurações de privacidade.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Terceiros */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">6. Integrações e Rastreamento de Terceiros</h2>

                    <div className="space-y-3">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded">
                            <h3 className="font-semibold">Google Analytics 4</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Análise de comportamento e conversão.
                                <a href="https://www.google.com/analytics/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                                    Opt-out disponível
                                </a>
                            </p>
                        </div>

                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded">
                            <h3 className="font-semibold">Facebook Pixel</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Rastreamento de conversão e retargeting.
                                <a href="https://www.facebook.com/ads/preferences" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                                    Gerenciar preferências
                                </a>
                            </p>
                        </div>

                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded">
                            <h3 className="font-semibold">Stripe</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Segurança e fraude do pagamento (criptografado).
                                <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                                    Política Stripe
                                </a>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Conformidade */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">7. Conformidade Legal</h2>
                    <div className="space-y-3">
                        <div className="flex gap-3">
                            <span>🇧🇷</span>
                            <div>
                                <p className="font-semibold">Brasil (LGPD)</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Consentimento explícito requerido para cookies não-essenciais
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span>🇪🇺</span>
                            <div>
                                <p className="font-semibold">União Europeia (GDPR)</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Consentimento explícito obrigatório se você acessar de país da UE
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span>🇺🇸</span>
                            <div>
                                <p className="font-semibold">Califórnia (CCPA)</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Direitos de saber, deletar e não-venda de dados
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contato */}
                <section className="space-y-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold">8. Contato</h2>
                    <p>Para dúvidas sobre cookies:</p>
                    <div className="space-y-2">
                        <p>📧 <strong>Email:</strong> autoricbr@gmail.com</p>
                        <p>🌐 <strong>Website:</strong> <a href="https://smartplant.app.br" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">smartplant.app.br</a></p>
                    </div>
                    <p className="text-sm mt-4">
                        Acesse "Preferências de Cookie" no footer para gerenciar suas escolhas a qualquer momento.
                    </p>
                </section>
            </article>
        </Container>
    );
}
