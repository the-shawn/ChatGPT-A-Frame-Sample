function FindAframeElements(text) {
    let generatedElements = [];
    // <a-scene> と </a-scene> タグの間の内容、または全体の内容を抽出する正規表現
    const regex = /```(?:html)?\s*([\s\S]*?)```/g;
    let matchCodeBlock;
    while ((matchCodeBlock = regex.exec(text)) !== null) {
        const codeBlockContent = matchCodeBlock[1];
        console.log("コードブロック内\n" + codeBlockContent);
        const sceneContentRegex = /<a-scene[^>]*>([\s\S]*?)<\/a-scene>/;
        const matchScene = sceneContentRegex.exec(codeBlockContent);
        if (matchScene) {
            const sceneContent = matchScene[1];
            processSceneContent(sceneContent,generatedElements );
        } else {
            const fallbackRegex = /<a-[\w-]+[\s\S]*?(?:\/>|<\/a-[\w-]+>)/g;
            const matches = codeBlockContent.match(fallbackRegex);
            console.log("matches\n" + matches);
            // A-Frame のプリミティブ要素が見つかった場合
            if (matches) {
                const sceneContent = matches.join("\n");
                processSceneContent(sceneContent,generatedElements);
            }
        }   
    }
    return generatedElements;
}

function processSceneContent(sceneContent, generatedElements) {
    console.log("タグ\n" + sceneContent);
    // containerに各要素を追加
    const elements = document.createElement('div');
    elements.innerHTML = sceneContent.trim();
    while (elements.firstChild) {
        if(elements.firstChild.outerHTML){
            generatedElements.push(elements.firstChild);
        }
        elements.removeChild(elements.firstChild);
    }
}