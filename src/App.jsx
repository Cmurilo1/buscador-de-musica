import { useState } from 'react'

function App() {
  const [busca, setBusca] = useState('')
  const [resultados, setResultados] = useState([])

  const pesquisarMusica = async () => {
    if (!busca) return
    const resposta = await fetch(`https://itunes.apple.com/search?term=${busca}&entity=song&limit=12`)
    const dados = await resposta.json()
    setResultados(dados.results)
  }

  return (
    <div style={{ backgroundColor: '#1a1a2e', minHeight: '100vh', color: 'white', padding: '20px', textAlign: 'center' }}>
      
      <h1>🎵 Music Finder</h1>
      
      <input 
        type="text" 
        placeholder="Digite o nome do artista..." 
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{ padding: '10px', borderRadius: '5px', border: 'none', width: '250px' }}
      />
      
      <button onClick={pesquisarMusica} style={{ padding: '10px 20px', marginLeft: '10px', borderRadius: '5px', backgroundColor: '#1DB954', border: 'none', cursor: 'pointer' }}>
        Pesquisar
      </button>

      <hr style={{ margin: '30px 0', borderColor: '#333' }} />

      {/* ÍCONE DE FONE (Simples, usando Emoji) */}
      {resultados.length === 0 && (
        <div style={{ marginTop: '50px', opacity: '0.5' }}>
          <div style={{ fontSize: '100px' }}>🎧</div>
          <p>Busque uma música para começar!</p>
        </div>
      )}

      {/* GRID DE MÚSICAS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {resultados.map((musica) => (
          <div key={musica.trackId} style={{ backgroundColor: '#161616', padding: '15px', borderRadius: '10px' }}>
            <img src={musica.artworkUrl100} alt={musica.trackName} style={{ borderRadius: '5px', width: '100%' }} />
            <h3 style={{ fontSize: '16px' }}>{musica.trackName}</h3>
            <p style={{ fontSize: '14px', color: '#aaa' }}>{musica.artistName}</p>
            <audio controls src={musica.previewUrl} style={{ width: '100%' }}></audio>
          </div>
        ))}
      </div>

    </div>
  )
}

export default App