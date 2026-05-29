import { useState, useEffect, useCallback, useMemo } from 'react'
import './styles.css'

const AESTHETICS = [
  {
    id: 'dark-academia',
    label: 'Dark Academia',
    icon: '✦',
    aura: 'Old soul · Candlelight · Forbidden books',
    palettes: [
      ['#1a1410', '#3d2817', '#8b6f47', '#d4a574'],
      ['#0f0a08', '#2c1810', '#735238', '#c9a06b'],
      ['#161210', '#4a2f20', '#a07a55', '#e3c89a'],
    ],
    username: {
      prefixes: ['lord', 'lady', 'saint', 'doc', 'sir', 'miss', 'fr'],
      cores: ['oscar', 'sylvia', 'edith', 'rilke', 'byron', 'shelley', 'keats', 'wilde', 'plath', 'austen', 'poe', 'donne', 'arthur', 'eleanor', 'henry', 'cordelia', 'sebastian', 'theodore', 'evelyn', 'beatrice'],
      suffixes: ['library', 'oxford', 'latin', 'verse', 'archive', 'chapel', 'study', 'sonnet', 'manuscript'],
    },
    bioParts: [
      ['reading dead poets', 'translating latin', 'underlining everything', 'haunting the library', 'whispering in archives', 'rewriting marginalia'],
      ['black coffee + cigarette', 'candlelight only', 'rainy windows forever', 'two espressos behind', 'wool sweater in july', 'museum after hours'],
      ['probably crying about a novel', 'will quote keats unprompted', 'currently in 1849', 'born in the wrong century', 'fluent in melancholy', 'writes letters by hand'],
    ],
    traits: ['melancholic', 'literary', 'pretentious-on-purpose', 'autumnal', 'romantic', 'introspective', 'old-fashioned', 'wistful'],
    signatures: ['memento mori', 'tempus fugit', 'ad astra', 'amor fati', 'carpe noctem', 'sub rosa', 'in absentia'],
  },
  {
    id: 'cottagecore',
    label: 'Cottagecore',
    icon: '❋',
    aura: 'Soft mornings · Bread crumbs · Wildflowers',
    palettes: [
      ['#f4e8d0', '#c9b896', '#8a9a6b', '#5a6b4a'],
      ['#ede2cc', '#d4a574', '#b08968', '#7a8a5a'],
      ['#f9efd9', '#e8c994', '#a8b87a', '#6b7a4a'],
    ],
    username: {
      prefixes: ['little', 'sweet', 'tiny', 'meadow', 'wild', 'baby'],
      cores: ['fern', 'daisy', 'clover', 'sage', 'willow', 'hazel', 'poppy', 'rosie', 'maple', 'juniper', 'olive', 'wren', 'birdie', 'bramble', 'meadow', 'thistle', 'ivy', 'flora', 'pearl', 'honey'],
      suffixes: ['cottage', 'garden', 'meadow', 'brook', 'cottage', 'pond', 'orchard', 'hearth', 'kitchen'],
    },
    bioParts: [
      ['baking sourdough', 'pressing flowers', 'tending to herbs', 'feeding the birds', 'jarring jam', 'sketching mushrooms'],
      ['ankle-deep in wildflowers', 'tea in the morning, tea at night', 'lives in linen', 'walks barefoot in dew', 'collects pretty rocks', 'names every plant'],
      ['talks to bees', 'definitely a forest spirit', 'soft girl summer', 'making this house a home', 'just out picking elderflower', 'currently making something rise'],
    ],
    traits: ['gentle', 'pastoral', 'nostalgic', 'earthy', 'patient', 'whimsical', 'homey', 'tender'],
    signatures: ['tend & mend', 'simple things', 'soft & slow', 'grow your own', 'home is here', 'gather, dont gather'],
  },
  {
    id: 'y2k',
    label: 'Y2K',
    icon: '◈',
    aura: 'Lip gloss · Frosted tips · Glitter everything',
    palettes: [
      ['#ff6ec7', '#7fdbff', '#b4f8c8', '#fdfd96'],
      ['#ff5dac', '#a0e7e5', '#fbe7c6', '#b4f8c8'],
      ['#ff85b3', '#84d2f6', '#f5b0cb', '#fff5b8'],
    ],
    username: {
      prefixes: ['xx', 'pr1ncess', 'lil', 'mz', 'baby', '2000'],
      cores: ['britney', 'angel', 'baby', 'glitter', 'sparkle', 'bubblegum', 'cherry', 'kitty', 'sugar', 'crush', 'diva', 'gemini', 'bratz', 'cupcake', 'starlite', 'butterfly', 'malibu', 'lolli', 'kiki', 'mimi'],
      suffixes: ['xo', '2k', '00', 'xx', '4eva', 'baybee', 'zz', 'iez'],
    },
    bioParts: [
      ['rhinestoned to the teeth', 'lip gloss is a lifestyle', 'live-laugh-lipgloss', 'cyber princess online', 'glitter in my coffee', 'butterfly clips forever'],
      ['frosted everything', 'a paris hilton apologist', 'low rise, high heels', 'cd-rom emotions', 'flip phone vibes only', 'mall is my third place'],
      ['cell: ★2k★', 'aim sn: gimme more', 'currently obsessed with: ME', 'in my popstar era', 'a real life sim character', 'making it look easy babe'],
    ],
    traits: ['sparkly', 'flirty', 'bratty', 'maximalist', 'iconic', 'glossy', 'extra', 'fearless'],
    signatures: ['xoxo', 'ur fave', 'iconic only', 'born to slay', 'main character ★', 'this is my era'],
  },
  {
    id: 'cyberpunk',
    label: 'Cyberpunk',
    icon: '◆',
    aura: 'Neon rain · Encrypted thoughts · Night city',
    palettes: [
      ['#0a0a14', '#1a1a3a', '#00f0ff', '#ff00aa'],
      ['#0d0d1f', '#2d1b3d', '#ff2a6d', '#05d9e8'],
      ['#0a0e1a', '#1f1f3f', '#f900bf', '#00fff0'],
    ],
    username: {
      prefixes: ['n3on', 'cyb3r', 'gh0st', 'v01d', 'r00t', 'sys', 'null'],
      cores: ['raven', 'glitch', 'cipher', 'omen', 'static', 'neon', 'shard', 'specter', 'vex', 'krono', 'nyx', 'helix', 'rune', 'codex', 'matrix', 'wraith', 'nova', 'jinx', 'pulse', 'flux'],
      suffixes: ['.exe', '_x', '404', '_v2', '.net', 'sys', '0', '1337'],
    },
    bioParts: [
      ['running on caffeine and dread', 'jacked into the feed', 'corp drone by day', 'encrypted by default', 'last seen offline 2019', 'broadcasting from a fire escape'],
      ['neon-lit by 7pm', 'noodle bar regular', 'allergic to authority', 'sells you to no one', 'rooftop dweller', 'always already late'],
      ['my data, not yours', 'do not call me human', 'currently jailbreaking the moon', 'the algorithm hates me back', 'low signal, high stakes', 'i was never here'],
    ],
    traits: ['edgy', 'anonymous', 'paranoid', 'wired', 'nocturnal', 'restless', 'sharp', 'dystopian'],
    signatures: ['/// stay encrypted', '> end transmission', 'see u in the static', 'wake up, samurai', 'no logs, no master', 'we are the noise'],
  },
  {
    id: 'vaporwave',
    label: 'Vaporwave',
    icon: '✺',
    aura: 'Mall fountains · Greek busts · Dial tone',
    palettes: [
      ['#ff71ce', '#01cdfe', '#05ffa1', '#b967ff'],
      ['#ff6ad5', '#c774e8', '#ad8cff', '#8795e8'],
      ['#ff9ec7', '#a685e2', '#94c5cc', '#f7d6e0'],
    ],
    username: {
      prefixes: ['ＡＥＳＴＨＥＴＩＣ', 'plaza', 'tokyo', 'macintosh', 'sega', 'mall', 'palm'],
      cores: ['venus', 'plaza', 'echo', 'lotus', 'crystal', 'azure', 'horizon', 'mirage', 'sunset', 'arcade', 'palm', 'neon', 'memory', 'pacific', 'silk', 'orchid', 'mirage', 'velvet', 'pearl', 'tropical'],
      suffixes: ['98', 'mall', 'fm', 'tape', 'jpeg', 'tv', '420'],
    },
    bioParts: [
      ['lo-fi forever', 'born in the food court', 'living in 1996', 'dreaming in 240p', 'half-melted, half-rendered', 'haunting the mall after dark'],
      ['crt monitor energy', 'aqua menu enjoyer', 'macintosh plus on loop', 'thinking about that one mall', 'palm trees at midnight', 'definitely not from now'],
      ['signal is breaking up', 'message me thru the static', 'lost in a vhs tape', 'currently in liminal space', 'do u remember the mall', 'check your DM in 1997'],
    ],
    traits: ['dreamy', 'nostalgic', 'glitched', 'tropical', 'ironic', 'soft', 'languid', 'analog'],
    signatures: ['ｓｏ ｆａｒ ｇｏｎｅ', 'forever 1995', 'mall energy', 'press start', '☁ ☆ ☁', 'dreaming.exe'],
  },
  {
    id: 'minimalist',
    label: 'Minimalist',
    icon: '○',
    aura: 'White walls · Black coffee · Less of everything',
    palettes: [
      ['#fafaf7', '#e8e6e0', '#a8a39b', '#2b2a28'],
      ['#f5f5f0', '#cfcdc6', '#7a7770', '#1f1e1c'],
      ['#fbfbf9', '#d8d6d0', '#6e6b65', '#171615'],
    ],
    username: {
      prefixes: ['', '', 'mr', 'm', ''],
      cores: ['kai', 'noa', 'ren', 'eli', 'mio', 'ari', 'nika', 'lou', 'ines', 'sol', 'yui', 'jo', 'ada', 'iris', 'oli', 'nin', 'eve', 'lev', 'ezo', 'remi'],
      suffixes: ['.', '_', '', 'co', ''],
    },
    bioParts: [
      ['less, but better', 'three things only', 'one room, one chair', 'edit the noise', 'subtract until it works', 'a quiet life'],
      ['minimum effective dose', 'walks at dawn', 'wears one outfit', 'reads slowly', 'thinks in white space', 'currently doing less'],
      ['no caption needed', 'silence speaks', 'small letters', 'a single line', 'whitespace enjoyer', '— that is all'],
    ],
    traits: ['calm', 'precise', 'measured', 'quiet', 'intentional', 'spare', 'patient', 'clean'],
    signatures: ['less.', 'sub-stract', 'pause.', 'one thing at a time', '...', 'just this'],
  },
  {
    id: 'soft-girl',
    label: 'Soft Girl',
    icon: '✿',
    aura: 'Cheek blush · Soft serve · Tiny clips',
    palettes: [
      ['#ffe0ec', '#ffc2d4', '#ffaac4', '#a8d8ea'],
      ['#fff0f3', '#ffd6e0', '#ffb3c1', '#c8b6ff'],
      ['#fbe4ec', '#f7c6d6', '#e8a8c8', '#bde0fe'],
    ],
    username: {
      prefixes: ['lil', 'soft', 'angel', 'dolly', 'baby', 'sweet'],
      cores: ['peach', 'mochi', 'honey', 'milky', 'cherry', 'lulu', 'rosie', 'pinky', 'lila', 'sugar', 'plum', 'cocoa', 'cloudy', 'minty', 'pixie', 'cozy', 'bunni', 'nori', 'mango', 'daisy'],
      suffixes: ['chan', 'bb', '.ily', 'ㅇ', 'core', '✿', ':3'],
    },
    bioParts: [
      ['serotonin enthusiast', 'tiny hearts in everything', 'soft launching myself', 'plushie collector', 'snack-sized and proud', 'romanticizing the small things'],
      ['matching pajama sets', 'strawberry in tea', 'three-step skincare', 'pastel everything', 'pinterest brain', 'always low-key giggling'],
      ['just a girl, your honor', 'be soft, take naps', 'currently in soft girl era', 'on my main character walk', 'crying happy tears', 'this is my safe space'],
    ],
    traits: ['gentle', 'sweet', 'cozy', 'pink', 'shy', 'precious', 'tender', 'glowy'],
    signatures: ['stay soft', 'be kind, be cute', '✿ soft ✿', 'pls be gentle', 'love love love', 'sending pink'],
  },
  {
    id: 'dreamcore',
    label: 'Dreamcore',
    icon: '◐',
    aura: 'Half-asleep · Liminal halls · Surreal weather',
    palettes: [
      ['#a8c0ff', '#d4a5f9', '#fcd0a1', '#c1c8e4'],
      ['#b8c4ff', '#e0baff', '#fcdec0', '#d4d8f0'],
      ['#9bb0e8', '#bf8be8', '#e8c89a', '#a8b4d4'],
    ],
    username: {
      prefixes: ['half', 'almost', 'soft', 'pale', 'sleepy'],
      cores: ['cloud', 'echo', 'mirror', 'pool', 'haze', 'fawn', 'drift', 'lake', 'hush', 'mauve', 'glade', 'rune', 'gauze', 'fern', 'limen', 'dream', 'foam', 'angel', 'mood', 'wisp'],
      suffixes: ['core', '???', '...', 'less', 'ish', '_x'],
    },
    bioParts: [
      ['was i awake', 'forgot what year it is', 'on a long blue hallway', 'humming a song i never learned', 'somewhere familiar but wrong', 'last seen in a memory'],
      ['nostalgic for what didnt happen', 'permanent 3am hours', 'eyes adjusting still', 'walking thru wet grass', 'one fluorescent light on', 'static between channels'],
      ['ask me in the morning', 'are you also in here', 'left the playground at dusk', 'something just felt off', 'currently in a dream of a dream', 'see you in the next loop'],
    ],
    traits: ['hazy', 'unsettled', 'wistful', 'soft-eyed', 'displaced', 'dreaming', 'liminal', 'tender'],
    signatures: ['so it goes', 'just a feeling', 'wake me up later', '☾ drift ☾', 'see you in the dream', 'still here, almost'],
  },
  {
    id: 'goblincore',
    label: 'Goblincore',
    icon: '✤',
    aura: 'Mossy pockets · Shiny rocks · Dirt joy',
    palettes: [
      ['#3d4a2a', '#6b7a3d', '#a8a25c', '#d4c47a'],
      ['#2c3d20', '#5a6b35', '#9aa050', '#c7b96b'],
      ['#404a2e', '#7a8a3d', '#b8a85a', '#d4c485'],
    ],
    username: {
      prefixes: ['lil', 'gobby', 'mossy', 'dirty', 'creak', 'snail'],
      cores: ['toad', 'moss', 'beetle', 'fungi', 'rot', 'mush', 'twig', 'creek', 'snail', 'pebble', 'bog', 'thistle', 'thorn', 'grub', 'fern', 'critter', 'mire', 'sproot', 'rind', 'gunk'],
      suffixes: ['gob', 'gnaw', 'ling', 'ish', 'kin', 'borb'],
    },
    bioParts: [
      ['collecting rocks for no reason', 'pockets full of acorns', 'best friends with one specific crow', 'in love with a particular log', 'know where all the snails live', 'speaks fluent frog'],
      ['dirt under fingernails (intentional)', 'currently digging up something', 'never met a mushroom i didnt love', 'foraging is a personality', 'feral but polite', 'made of moss and spite'],
      ['this rock is special to me', 'i found a really good stick', 'do u want to see my bug', 'pls do not perceive me', 'i live in a hole and im happy', 'gimme that shiny'],
    ],
    traits: ['feral', 'curious', 'gleeful', 'mossy', 'chaotic', 'tiny', 'earthy', 'silly'],
    signatures: ['stay damp', 'collect everything', 'gob gob gob', 'be a creature', 'rot in peace', 'eat the moss'],
  },
  {
    id: 'coastal',
    label: 'Coastal',
    icon: '◉',
    aura: 'Salt air · Linen pants · Slow afternoons',
    palettes: [
      ['#f0ebe1', '#d4cdb8', '#7a9b9b', '#3a5a6b'],
      ['#f5efe2', '#e0d4b8', '#94b0b5', '#446b7a'],
      ['#faf3e3', '#d8c9a8', '#6b9099', '#2c5266'],
    ],
    username: {
      prefixes: ['cape', 'bay', 'shore', 'gulf', 'isle'],
      cores: ['hudson', 'wren', 'briar', 'sloane', 'reeve', 'caspian', 'nantucket', 'rowan', 'isla', 'pacific', 'haven', 'marin', 'breck', 'easton', 'monroe', 'lennox', 'kit', 'hollis', 'sailor', 'magnolia'],
      suffixes: ['& co', '.house', '.club', 'estate', 'shore', '.linen'],
    },
    bioParts: [
      ['lemons on the counter', 'permanently sun-kissed', 'linen pants & a glass of white', 'nantucket but make it tuesday', 'always smells like sunscreen', 'salt-stained jeans'],
      ['gardening before noon', 'a long walk with a labrador', 'baking on the porch', 'reading the same novel for weeks', 'a single white room', 'oat milk + ocean view'],
      ['currently making lemonade', 'see you at the harbor', 'low tide, high spirits', 'no shoes inside', 'phone in another room', 'unbothered by design'],
    ],
    traits: ['breezy', 'composed', 'sun-bleached', 'understated', 'serene', 'crisp', 'tide-pulled', 'easeful'],
    signatures: ['salt & light', 'soft summer', 'low & slow', 'sun on the deck', 'be by the water', 'breathe in the salt'],
  },
]

const STORAGE_KEY = 'internet-persona-generator-v1'

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function pickUnique(arr, n) {
  const copy = [...arr]
  const out = []
  while (out.length < n && copy.length) {
    const i = Math.floor(Math.random() * copy.length)
    out.push(copy.splice(i, 1)[0])
  }
  return out
}

function generateUsername(parts) {
  const mode = Math.floor(Math.random() * 5)
  const core = pick(parts.cores)
  const prefix = pick(parts.prefixes)
  const suffix = pick(parts.suffixes)
  const num = Math.floor(Math.random() * 99) + 1

  switch (mode) {
    case 0:
      return prefix ? `${prefix}${core}` : `${core}${num}`
    case 1:
      return suffix ? `${core}${suffix}` : `${core}_${num}`
    case 2:
      return `${core}${num}`
    case 3:
      return prefix && suffix ? `${prefix}${core}${suffix}` : `${core}${num}`
    default:
      return `${core}_${pick(parts.cores)}`
  }
}

function generateBio(bioParts) {
  const a = pick(bioParts[0])
  const b = pick(bioParts[1])
  const c = pick(bioParts[2])
  return `${a} · ${b} · ${c}`
}

function generatePersona(aestheticId) {
  const aes = AESTHETICS.find(a => a.id === aestheticId)
  return {
    aestheticId: aes.id,
    aestheticLabel: aes.label,
    aestheticIcon: aes.icon,
    aura: aes.aura,
    username: generateUsername(aes.username),
    bio: generateBio(aes.bioParts),
    palette: pick(aes.palettes),
    traits: pickUnique(aes.traits, 4),
    signature: pick(aes.signatures),
  }
}

export default function App() {
  const [aestheticId, setAestheticId] = useState('dark-academia')
  const [persona, setPersona] = useState(null)
  const [saved, setSaved] = useState([])
  const [copied, setCopied] = useState(false)
  const [showSaved, setShowSaved] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setSaved(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
    } catch {}
  }, [saved])

  const regenerate = useCallback(() => {
    setPersona(generatePersona(aestheticId))
    setCopied(false)
  }, [aestheticId])

  useEffect(() => {
    regenerate()
  }, [regenerate])

  const handleAestheticPick = useCallback((id) => {
    setAestheticId(id)
  }, [])

  const handleRandomAesthetic = useCallback(() => {
    const next = pick(AESTHETICS.filter(a => a.id !== aestheticId)).id
    setAestheticId(next)
  }, [aestheticId])

  const copyPersona = useCallback(() => {
    if (!persona) return
    const text = `${persona.username}\n${persona.aestheticLabel} · ${persona.aura}\n\n${persona.bio}\n\nPalette: ${persona.palette.join(' · ')}\nTraits: ${persona.traits.join(', ')}\nSignature: ${persona.signature}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    })
  }, [persona])

  const isCurrentSaved = useMemo(() => {
    if (!persona) return false
    return saved.some(s => s.username === persona.username && s.bio === persona.bio)
  }, [persona, saved])

  const toggleSave = useCallback(() => {
    if (!persona) return
    if (isCurrentSaved) {
      setSaved(prev => prev.filter(s => !(s.username === persona.username && s.bio === persona.bio)))
    } else {
      setSaved(prev => [persona, ...prev].slice(0, 24))
    }
  }, [persona, isCurrentSaved])

  const removeSaved = useCallback((idx) => {
    setSaved(prev => prev.filter((_, i) => i !== idx))
  }, [])

  const clearSaved = useCallback(() => {
    setSaved([])
  }, [])

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="header-left">
            <div>
              <h1 className="header-title">Internet Persona Generator</h1>
              <p className="header-sub">Pick a vibe. Get your full aesthetic identity.</p>
            </div>
          </div>
          <div className="header-right">
            <button
              className={`btn-ghost${showSaved ? ' active' : ''}`}
              onClick={() => setShowSaved(s => !s)}
              aria-label="Toggle saved personas panel"
            >
              <IconBookmark filled={saved.length > 0} />
              <span>Saved</span>
              {saved.length > 0 && <span className="count-pill">{saved.length}</span>}
            </button>
          </div>
        </div>
      </header>

      <main className="main">
        {/* Aesthetic picker */}
        <section className="control-block">
          <div className="section-label">
            <span>Choose your aesthetic</span>
            <button className="btn-link" onClick={handleRandomAesthetic} aria-label="Pick a random aesthetic">
              Surprise me
            </button>
          </div>
          <div className="aes-grid">
            {AESTHETICS.map(a => (
              <button
                key={a.id}
                className={`aes-chip${aestheticId === a.id ? ' active' : ''}`}
                onClick={() => handleAestheticPick(a.id)}
                aria-pressed={aestheticId === a.id}
                aria-label={`Select ${a.label} aesthetic`}
              >
                <span className="aes-icon">{a.icon}</span>
                <span className="aes-label">{a.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Persona card */}
        {persona && (
          <section className="persona-card" key={`${persona.username}-${persona.bio}`}>
            <div className="persona-head">
              <span className="persona-aesthetic">
                <span className="persona-aesthetic-icon">{persona.aestheticIcon}</span>
                <span>{persona.aestheticLabel}</span>
              </span>
              <span className="persona-aura">{persona.aura}</span>
            </div>

            <h2 className="persona-username">@{persona.username}</h2>
            <p className="persona-vibe">Your handle in this universe</p>

            <p className="persona-bio">"{persona.bio}"</p>

            <div className="palette-row" aria-label="Color palette">
              {persona.palette.map((hex, i) => (
                <div
                  key={`${hex}-${i}`}
                  className="swatch"
                  style={{ background: hex }}
                  title={hex}
                  onClick={() => navigator.clipboard.writeText(hex)}
                >
                  <span className="swatch-hex">{hex.toUpperCase()}</span>
                </div>
              ))}
            </div>

            <div className="traits-row">
              {persona.traits.map(t => (
                <span key={t} className="trait-chip">{t}</span>
              ))}
            </div>

            <div className="persona-signature">
              <span className="signature-label">Signature</span>
              <span className="signature-value">"{persona.signature}"</span>
            </div>
          </section>
        )}

        {/* Actions */}
        <div className="action-row">
          <button className="btn-primary" onClick={regenerate} aria-label="Generate a new persona">
            <IconShuffle />
            <span>Regenerate</span>
          </button>
          <button
            className={`btn-secondary${copied ? ' copied' : ''}`}
            onClick={copyPersona}
            aria-label="Copy persona to clipboard"
          >
            {copied ? <IconCheck /> : <IconCopy />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            className={`btn-secondary${isCurrentSaved ? ' saved' : ''}`}
            onClick={toggleSave}
            aria-label={isCurrentSaved ? 'Remove from saved' : 'Save persona'}
          >
            <IconBookmark filled={isCurrentSaved} />
            <span>{isCurrentSaved ? 'Saved' : 'Save'}</span>
          </button>
          <span className="hint">Tap any swatch to copy the hex</span>
        </div>

        {/* Saved panel */}
        {showSaved && (
          <section className="saved-panel">
            <div className="saved-head">
              <div className="section-label" style={{ margin: 0 }}>
                <span>Saved personas</span>
              </div>
              {saved.length > 0 && (
                <button className="btn-link" onClick={clearSaved} aria-label="Clear all saved personas">
                  Clear all
                </button>
              )}
            </div>
            {saved.length === 0 ? (
              <p className="empty">
                Tap "Save" on any persona to keep it here.
              </p>
            ) : (
              <div className="saved-grid">
                {saved.map((s, i) => (
                  <div key={`${s.username}-${i}`} className="saved-card">
                    <div className="saved-info">
                      <span className="saved-username">@{s.username}</span>
                      <span className="saved-aes">{s.aestheticLabel}</span>
                    </div>
                    <div className="saved-swatches">
                      {s.palette.map((hex, j) => (
                        <div key={j} className="saved-swatch" style={{ background: hex }} />
                      ))}
                    </div>
                    <button
                      className="icon-btn"
                      onClick={() => removeSaved(i)}
                      aria-label="Remove this saved persona"
                      title="Remove"
                    >
                      <IconX />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="credit">
        Coded by{' '}
        <a href="https://instagram.com/berkindev" target="_blank" rel="noopener noreferrer" className="credit-link">
          berkindev
        </a>
      </footer>
    </div>
  )
}

function IconShuffle() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4h2.5l7 8H14" />
      <path d="M2 12h2.5l7-8H14" />
      <path d="M12 2l2 2-2 2" />
      <path d="M12 10l2 2-2 2" />
    </svg>
  )
}

function IconBookmark({ filled }) {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2.5h8v11l-4-3-4 3v-11z" />
    </svg>
  )
}

function IconCopy() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="4" y="4" width="8" height="8" rx="1.5" />
      <path d="M10 4V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7l4 4 6-6" />
    </svg>
  )
}

function IconX() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M3 3l8 8M11 3l-8 8" />
    </svg>
  )
}
