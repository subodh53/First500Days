export async function analyzeChart(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error('Failed to analyze chart');
    }

    return response.json();
}