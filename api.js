const API_BASE_URL = "https://recyctech-back.onrender.com";

export async function enviarImagemAPI(arquivo) {
    const formData = new FormData();
    formData.append("file", arquivo);

    try {
        const response = await fetch(`${API_BASE_URL}/analisar`, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Erro ao analisar a imagem: ${response.statusText}`);
        }

        const data = await response.json();


        if (!data.objetos || !Array.isArray(data.objetos)) {
            throw new Error("Resposta da API não contém um array de objetos");
        }

        return data;
    } catch (error) {
        console.error("Erro ao enviar a imagem:", error);
        throw new Error(`Erro ao analisar a imagem: ${error.message}`);
    }
}



export async function enviarFeedbackAPI(categoria, feedbackSelecionado) {
    const formData = new FormData();
    formData.append("categoria", categoria); 
    formData.append("feedback", feedbackSelecionado); 

    const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: "POST",
        body: formData
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao enviar feedback: ", errorData);
        throw new Error("Erro ao enviar feedback");
    }else{
        console.log("Feedback enviado: ", feedbackSelecionado);
    }
    
    return await response.json();
}
