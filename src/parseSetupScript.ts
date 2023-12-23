// import ts from 'typescript';

export default async function parseSetupScript(script: HTMLScriptElement, scriptCode: string) {
    const isTypeScript = (script?.attributes as any)?.lang?.value === 'ts'
    const sc = document.createElement('script')
    sc.src = 'https://unpkg.com/typescript/lib/typescript.js'
    const promise = new Promise((resolve, reject) => {
        sc.onload = resolve
        sc.onerror = reject
    })
    document.head.appendChild(sc)
    await promise
    const ts = (window as any).ts
    const sf = ts.createSourceFile(
        "test." + (isTypeScript ? "ts" : "js"),
        scriptCode,
        99, // ts.ScriptTarget.LATEST,
        true,
        isTypeScript ? 3 : 1, // ts.ScriptKind.JS,
    );
    const items = []
    ts.forEachChild(sf, (node) => {
        if (ts.isFunctionDeclaration(node)) {
            const name = node.name.text;
            items.push(name)
        } else if (ts.isVariableStatement(node)) {
            node.declarationList.declarations.forEach((decl) => {
                const name = decl.name.getText();
                items.push(name)
            });
        } else if (ts.isImportDeclaration(node)) {
            if (node.moduleSpecifier.getText().match(/['"]vue['"]/))
                items.push(...node.importClause.namedBindings.elements.map((e) => e.name.getText()))
        }
    });
    const importRegex = /import[\s\S]*?from[\s\S]*?[;\n]/g;
    const importsCode = scriptCode.match(importRegex)?.join('\n') || '';
    scriptCode = scriptCode.replace(importRegex, '');
    scriptCode = `\n${importsCode}\nexport default { setup() { ${scriptCode}\nreturn { ${items.join(', ')} } } }`;
    return scriptCode
}
