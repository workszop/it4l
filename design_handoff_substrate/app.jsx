// Substrate — editorial site for interactive computing demos.
// Single-page app with three views: Landing (Variant A or B) + Demo Detail.
// Variant switch lives in Tweaks, navigation between pages via in-page links.

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ─── Tiny hash router ──────────────────────────────────────────────────────
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || '#/');
  useEffect(() => {
    const onChange = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}
function navTo(h) {
  window.location.hash = h;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// ─── Demo catalog ──────────────────────────────────────────────────────────
const DEMOS = [
  {
    slug: 'tcp-handshake',
    no: '01',
    kicker: 'Networking',
    title: 'A conversation in three packets',
    dek: 'Every connection your browser makes begins with a small ritual: SYN, SYN-ACK, ACK. Watch it happen, then break it.',
    read: '12 min',
    interactive: true,
    author: 'M. Halberstam',
    date: 'Apr 2026',
  },
  {
    slug: 'dom-tree',
    no: '02',
    kicker: 'The Browser',
    title: 'How a webpage becomes a tree',
    dek: 'Markup is flat. The browser walks it character by character and builds a structure your CSS and JavaScript will spend the rest of the page\u2019s life manipulating.',
    read: '18 min',
    author: 'R. Okafor',
    date: 'Apr 2026',
  },
  {
    slug: 'cpu-pipeline',
    no: '03',
    kicker: 'Hardware',
    title: 'Five stages, one instruction',
    dek: 'Fetch, decode, execute, memory, write-back. A scalar pipeline does laundry: never one load at a time when five can be in flight.',
    read: '22 min',
    author: 'I. Chen',
    date: 'Mar 2026',
  },
  {
    slug: 'binary-search',
    no: '04',
    kicker: 'Algorithms',
    title: 'The patient art of halving',
    dek: 'Binary search is the cleanest argument in computer science: each guess throws away half of what remains. Until nothing does.',
    read: '9 min',
    author: 'S. Patel',
    date: 'Mar 2026',
  },
  {
    slug: 'cache-locality',
    no: '05',
    kicker: 'Hardware',
    title: 'Why your loop is slow',
    dek: 'The same arithmetic, the same array, two orderings. One runs ten times faster. Memory has a shape and your code either fits it or doesn\u2019t.',
    read: '15 min',
    author: 'I. Chen',
    date: 'Feb 2026',
  },
  {
    slug: 'http-request',
    no: '06',
    kicker: 'Networking',
    title: 'A GET request, in full',
    dek: 'Type a URL, press return. We follow the bytes from the address bar through DNS, TLS, headers, and the response that lands on your screen.',
    read: '20 min',
    author: 'M. Halberstam',
    date: 'Feb 2026',
  },
];

// ─── Layout primitives ─────────────────────────────────────────────────────
function MastheadA({ route }) {
  return (
    <header className="masthead-a">
      <div className="row">
        <div className="brand" onClick={() => navTo('#/')}>
          <span className="mark">S</span>
          <span className="wordmark">Substrate</span>
        </div>
        <nav className="topnav">
          <a className={route === '#/' ? 'active' : ''} onClick={() => navTo('#/')}>Issues</a>
          <a>Networking</a>
          <a>Hardware</a>
          <a>Algorithms</a>
          <a>The Browser</a>
        </nav>
        <div className="rightnav">
          <span className="vol">Vol. III · No. 14</span>
          <button className="sub-btn">Subscribe</button>
        </div>
      </div>
      <div className="rule" />
    </header>
  );
}

function MastheadB({ route }) {
  return (
    <header className="masthead-b">
      <div className="row">
        <div className="brand" onClick={() => navTo('#/')}>
          <span className="wordmark">SUBSTRATE</span>
          <span className="rule-h" />
          <span className="tag">An archive of how computers actually work</span>
        </div>
        <nav className="topnav">
          <a onClick={() => navTo('#/')}>Index</a>
          <a>Networks</a>
          <a>Silicon</a>
          <a>Methods</a>
          <a>About</a>
        </nav>
      </div>
    </header>
  );
}

function FooterA() {
  return (
    <footer className="footer-a">
      <div className="footer-rule" />
      <div className="footer-row">
        <div>
          <div className="brand">
            <span className="mark">S</span>
            <span className="wordmark">Substrate</span>
          </div>
          <p className="colophon">An editorial publication of interactive computing demos. Founded 2024. Set in Source Serif and Inter Tight; code in JetBrains Mono.</p>
        </div>
        <div className="cols">
          <div>
            <h6>Sections</h6>
            <a>Networking</a><a>Hardware</a><a>Algorithms</a><a>The Browser</a>
          </div>
          <div>
            <h6>About</h6>
            <a>Editorial</a><a>Contributors</a><a>Submissions</a><a>Press</a>
          </div>
          <div>
            <h6>Subscribe</h6>
            <a>Newsletter</a><a>RSS</a><a>Print archive</a>
          </div>
        </div>
      </div>
      <div className="footer-meta">
        <span>© 2026 Substrate Editorial</span>
        <span>ISSN 2998&ndash;0044</span>
      </div>
    </footer>
  );
}

function FooterB() {
  return (
    <footer className="footer-b">
      <div className="footer-rule" />
      <div className="footer-grid">
        <div className="col">
          <h6>SUBSTRATE</h6>
          <p>Volume III, Number 14. Published quarterly from a small office in Lisbon.</p>
        </div>
        <div className="col"><h6>Index</h6><a>Networks</a><a>Silicon</a><a>Methods</a></div>
        <div className="col"><h6>Editorial</h6><a>Mission</a><a>Contributors</a><a>Style</a></div>
        <div className="col"><h6>Stay</h6><a>Newsletter</a><a>RSS</a></div>
        <div className="col">
          <h6>ISSN</h6>
          <p>2998&ndash;0044<br />© MMXXVI</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Hero typographic statement (Variant A) ────────────────────────────────
function HeroA() {
  return (
    <section className="hero-a">
      <div className="hero-meta">
        <span>Issue 14</span>
        <span className="dot">·</span>
        <span>Spring 2026</span>
        <span className="dot">·</span>
        <span>Six demonstrations</span>
      </div>
      <h1 className="hero-title">
        The machines we use<br />
        <em>every day</em>, taken apart<br />
        and laid on the table.
      </h1>
      <div className="hero-sub-row">
        <p className="hero-dek">
          Substrate is a quiet publication about the layer of computing
          you stopped noticing. Each issue, we choose a handful of
          mechanisms&mdash;a handshake, a cache miss, a tree being built
          from a string&mdash;and let you turn them in your hands.
        </p>
        <div className="hero-cta">
          <button className="btn-primary" onClick={() => navTo('#/demo/tcp-handshake')}>
            Begin with the handshake →
          </button>
          <a className="btn-link">Browse the index</a>
        </div>
      </div>
    </section>
  );
}

// ─── Hero typographic statement (Variant B) ────────────────────────────────
function HeroB() {
  return (
    <section className="hero-b">
      <div className="hero-grid">
        <div className="hero-left">
          <div className="kicker">Issue XIV / Spring MMXXVI</div>
        </div>
        <div className="hero-center">
          <h1 className="hero-title">
            Read<br />
            the<br />
            machine.
          </h1>
          <p className="hero-dek">
            Six interactive essays on what happens between the keystroke and the pixel.
            We do not abstract; we open the box.
          </p>
        </div>
        <div className="hero-right">
          <div className="contents-block">
            <h6>In this issue</h6>
            <ol>
              {DEMOS.map((d) => (
                <li key={d.slug} onClick={() => navTo('#/demo/' + d.slug)}>
                  <span className="num">{d.no}</span>
                  <span className="ttl">{d.title}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Demo grid (Variant A) ─────────────────────────────────────────────────
function DemoGridA() {
  return (
    <section className="grid-a">
      <div className="section-head">
        <span className="kicker">In this issue</span>
        <h2>Six things to take apart</h2>
      </div>
      <div className="grid">
        {DEMOS.map((d, i) => (
          <article key={d.slug} className={`card${i === 0 ? ' lead' : ''}`}
                   onClick={() => navTo('#/demo/' + d.slug)}>
            <div className="card-thumb" data-slug={d.slug}>
              <DemoIllustration slug={d.slug} variant="a" />
              {d.interactive && <span className="badge">Interactive</span>}
            </div>
            <div className="card-body">
              <span className="kicker">{d.kicker}</span>
              <h3>{d.title}</h3>
              {i === 0 && <p className="dek">{d.dek}</p>}
              <div className="card-meta">
                <span>{d.author}</span>
                <span className="dot">·</span>
                <span>{d.read}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─── Demo list (Variant B) ─────────────────────────────────────────────────
function DemoListB() {
  return (
    <section className="grid-b">
      <div className="section-head">
        <span className="kicker">— Index of demonstrations</span>
      </div>
      <ul className="article-list">
        {DEMOS.map((d) => (
          <li key={d.slug} className="article-row" onClick={() => navTo('#/demo/' + d.slug)}>
            <div className="row-no">{d.no}</div>
            <div className="row-meta">
              <span className="kicker">{d.kicker}</span>
              <span className="row-author">{d.author}</span>
            </div>
            <div className="row-title">
              <h3>{d.title}</h3>
              <p>{d.dek}</p>
            </div>
            <div className="row-thumb">
              <DemoIllustration slug={d.slug} variant="b" />
            </div>
            <div className="row-read">
              {d.interactive && <span className="pill">Interactive</span>}
              <span className="read">{d.read}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─── Manifesto / pull quote section ────────────────────────────────────────
function ManifestoA() {
  return (
    <section className="manifesto-a">
      <blockquote>
        <p>
          “To understand a system, you have to watch it work&mdash;not
          read its specification. Substrate is an attempt to make the
          watching part easier.”
        </p>
        <cite>— from the editorial, Issue I</cite>
      </blockquote>
    </section>
  );
}

function ManifestoB() {
  return (
    <section className="manifesto-b">
      <div className="m-grid">
        <div className="m-label">EDITORIAL</div>
        <div className="m-body">
          <p>
            Most of what a computer does happens behind a curtain of metaphor: <em>files</em>,
            <em> windows</em>, <em>the cloud</em>. These are useful fictions. They are also,
            sometimes, in the way.
          </p>
          <p>
            Substrate publishes interactive demonstrations because the alternative&mdash;
            a paragraph attempting to describe an event that takes place in microseconds&mdash;
            is not really an alternative at all. We hope you stay a while.
          </p>
          <div className="m-sig">— The Editors</div>
        </div>
      </div>
    </section>
  );
}

// ─── Topic strip (B only) ──────────────────────────────────────────────────
function TopicStripB() {
  const topics = [
    { name: 'Networks', count: 8, blurb: 'Packets, protocols, the spaces between machines.' },
    { name: 'Silicon', count: 5, blurb: 'What the CPU is actually doing while you wait.' },
    { name: 'Methods', count: 11, blurb: 'Classical algorithms, walked through one step at a time.' },
    { name: 'The Browser', count: 6, blurb: 'A surprisingly elaborate document viewer.' },
  ];
  return (
    <section className="topics-b">
      <div className="t-head">
        <span className="kicker">— Departments</span>
      </div>
      <div className="t-grid">
        {topics.map((t) => (
          <div key={t.name} className="t-cell">
            <div className="t-num">{String(t.count).padStart(2, '0')}</div>
            <h3>{t.name}</h3>
            <p>{t.blurb}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Newsletter (A) ────────────────────────────────────────────────────────
function NewsletterA() {
  return (
    <section className="news-a">
      <div className="news-inner">
        <div>
          <h3>A new demonstration, every other Friday.</h3>
          <p>One short essay. One thing you can poke at. Nothing else.</p>
        </div>
        <form className="news-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="you@somewhere.net" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  );
}

// ─── Demo thumbnail illustrations (placeholders, schematic) ────────────────
function DemoIllustration({ slug, variant }) {
  const stroke = variant === 'a' ? '#1a1815' : '#e8e3d6';
  const accent = variant === 'a' ? '#b56a1d' : '#7fd4d8';
  const fill = variant === 'a' ? '#f3eee2' : '#1a1d22';
  const sub = variant === 'a' ? 'rgba(26,24,21,.18)' : 'rgba(232,227,214,.18)';

  if (slug === 'tcp-handshake') {
    return (
      <svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid meet">
        <rect width="200" height="130" fill={fill} />
        <line x1="36" y1="20" x2="36" y2="120" stroke={stroke} strokeWidth=".5" />
        <line x1="164" y1="20" x2="164" y2="120" stroke={stroke} strokeWidth=".5" />
        <text x="36" y="14" fontSize="6" fill={stroke} textAnchor="middle" fontFamily="ui-monospace,monospace">CLIENT</text>
        <text x="164" y="14" fontSize="6" fill={stroke} textAnchor="middle" fontFamily="ui-monospace,monospace">SERVER</text>
        <line x1="36" y1="40" x2="160" y2="55" stroke={accent} strokeWidth="1.2" markerEnd="url(#arr-a)" />
        <line x1="164" y1="65" x2="40" y2="80" stroke={accent} strokeWidth="1.2" markerEnd="url(#arr-a)" />
        <line x1="36" y1="90" x2="160" y2="105" stroke={accent} strokeWidth="1.2" markerEnd="url(#arr-a)" />
        <text x="100" y="46" fontSize="6" fill={stroke} textAnchor="middle" fontFamily="ui-monospace,monospace">SYN</text>
        <text x="100" y="71" fontSize="6" fill={stroke} textAnchor="middle" fontFamily="ui-monospace,monospace">SYN · ACK</text>
        <text x="100" y="96" fontSize="6" fill={stroke} textAnchor="middle" fontFamily="ui-monospace,monospace">ACK</text>
        <defs><marker id="arr-a" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill={accent} /></marker></defs>
      </svg>
    );
  }
  if (slug === 'dom-tree') {
    return (
      <svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid meet">
        <rect width="200" height="130" fill={fill} />
        <line x1="100" y1="22" x2="60" y2="55" stroke={stroke} strokeWidth=".5" />
        <line x1="100" y1="22" x2="100" y2="55" stroke={stroke} strokeWidth=".5" />
        <line x1="100" y1="22" x2="140" y2="55" stroke={stroke} strokeWidth=".5" />
        <line x1="60" y1="65" x2="40" y2="98" stroke={stroke} strokeWidth=".5" />
        <line x1="60" y1="65" x2="80" y2="98" stroke={stroke} strokeWidth=".5" />
        <line x1="140" y1="65" x2="120" y2="98" stroke={stroke} strokeWidth=".5" />
        <line x1="140" y1="65" x2="160" y2="98" stroke={stroke} strokeWidth=".5" />
        {[[100,22],[60,60],[100,60],[140,60],[40,103],[80,103],[120,103],[160,103]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="6" fill={i===0?accent:fill} stroke={stroke} strokeWidth=".7" />
        ))}
      </svg>
    );
  }
  if (slug === 'cpu-pipeline') {
    return (
      <svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid meet">
        <rect width="200" height="130" fill={fill} />
        {['IF','ID','EX','MEM','WB'].map((s, i) => (
          <g key={s}>
            <rect x={14 + i*36} y={50} width="30" height="30" fill={i===2?accent:'none'} stroke={stroke} strokeWidth=".7" />
            <text x={14 + i*36 + 15} y={68} fontSize="7" fill={i===2?fill:stroke} textAnchor="middle" fontFamily="ui-monospace,monospace">{s}</text>
          </g>
        ))}
        <line x1="44" y1="65" x2="50" y2="65" stroke={stroke} strokeWidth=".5" />
        <line x1="80" y1="65" x2="86" y2="65" stroke={stroke} strokeWidth=".5" />
        <line x1="116" y1="65" x2="122" y2="65" stroke={stroke} strokeWidth=".5" />
        <line x1="152" y1="65" x2="158" y2="65" stroke={stroke} strokeWidth=".5" />
        <text x="100" y="36" fontSize="6" fill={stroke} textAnchor="middle" fontFamily="ui-monospace,monospace">5-STAGE PIPELINE</text>
        <text x="100" y="100" fontSize="6" fill={stroke} textAnchor="middle" fontFamily="ui-monospace,monospace">cycle t</text>
      </svg>
    );
  }
  if (slug === 'binary-search') {
    return (
      <svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid meet">
        <rect width="200" height="130" fill={fill} />
        {Array.from({length: 16}).map((_, i) => {
          const active = i === 11;
          const inRange = i >= 8 && i <= 13;
          return <rect key={i} x={12 + i*11} y={40} width="9" height="50"
                       fill={active?accent:(inRange?fill:fill)}
                       stroke={active?accent:(inRange?stroke:sub)} strokeWidth=".7" />;
        })}
        <line x1="12 + 8*11" y1={96} x2="12 + 13*11" y2={96} stroke={stroke} />
        <text x="100" y="28" fontSize="7" fill={stroke} textAnchor="middle" fontFamily="ui-monospace,monospace">lo ≤ mid ≤ hi</text>
        <text x="125" y="108" fontSize="6" fill={accent} textAnchor="middle" fontFamily="ui-monospace,monospace">mid</text>
      </svg>
    );
  }
  if (slug === 'cache-locality') {
    return (
      <svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid meet">
        <rect width="200" height="130" fill={fill} />
        {Array.from({length: 8}).map((_, r) => (
          Array.from({length: 12}).map((__, c) => {
            const hot = r === 3 && c < 8;
            return <rect key={r+'-'+c} x={20 + c*14} y={20 + r*11} width="12" height="9"
                         fill={hot?accent:fill} stroke={hot?accent:stroke} strokeWidth=".5" opacity={hot?1:.5} />;
          })
        ))}
        <text x="100" y="118" fontSize="6" fill={stroke} textAnchor="middle" fontFamily="ui-monospace,monospace">row-major access pattern</text>
      </svg>
    );
  }
  if (slug === 'http-request') {
    return (
      <svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid meet">
        <rect width="200" height="130" fill={fill} />
        <text x="20" y="34" fontSize="7" fill={stroke} fontFamily="ui-monospace,monospace">GET /index.html HTTP/1.1</text>
        <text x="20" y="48" fontSize="7" fill={stroke} fontFamily="ui-monospace,monospace" opacity=".6">Host: substrate.press</text>
        <text x="20" y="62" fontSize="7" fill={stroke} fontFamily="ui-monospace,monospace" opacity=".6">Accept: text/html</text>
        <line x1="20" y1="74" x2="180" y2="74" stroke={stroke} strokeWidth=".5" opacity=".4" />
        <text x="20" y="88" fontSize="7" fill={accent} fontFamily="ui-monospace,monospace">HTTP/1.1 200 OK</text>
        <text x="20" y="102" fontSize="7" fill={stroke} fontFamily="ui-monospace,monospace" opacity=".6">Content-Type: text/html</text>
        <text x="20" y="116" fontSize="7" fill={stroke} fontFamily="ui-monospace,monospace" opacity=".4">Content-Length: 4218</text>
      </svg>
    );
  }
  return <svg viewBox="0 0 200 130"><rect width="200" height="130" fill={fill} /></svg>;
}

// ─── TCP Handshake interactive demo ────────────────────────────────────────
// Three packets travel between the two timelines. Drop checkbox forces a
// retransmit of whatever packet is in flight when you trip it.

function TCPHandshakeDemo() {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0); // 0 idle, 1 SYN, 2 SYN-ACK, 3 ACK, 4 done
  const [packets, setPackets] = useState([]); // {id, kind, dir, t0, dur, dropped, retransmit}
  const [drops, setDrops] = useState({ syn: false, synack: false, ack: false });
  const [latency, setLatency] = useState(900);
  const [log, setLog] = useState([]);
  const idRef = useRef(0);
  const timersRef = useRef([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const reset = useCallback(() => {
    clearTimers();
    setRunning(false);
    setStep(0);
    setPackets([]);
    setLog([]);
  }, []);

  useEffect(() => () => clearTimers(), []);

  const send = useCallback((kind, dir, onArrive) => {
    const id = ++idRef.current;
    const dur = latency;
    const willDrop = drops[kind];
    setPackets((p) => [...p, { id, kind, dir, t0: performance.now(), dur, dropped: willDrop }]);
    setLog((L) => [...L, willDrop
      ? { t: now(), msg: `${labelFor(kind)} sent · will be lost in transit`, tone: 'warn' }
      : { t: now(), msg: `${labelFor(kind)} sent`, tone: 'info' }
    ]);

    // Mid-flight: if dropped, mark and stop. If not, fire arrive callback at end.
    if (willDrop) {
      const t1 = setTimeout(() => {
        setPackets((p) => p.map(pk => pk.id === id ? { ...pk, droppedShown: true } : pk));
        setLog((L) => [...L, { t: now(), msg: `${labelFor(kind)} lost · timeout, retransmitting…`, tone: 'warn' }]);
        // Retransmit after timeout
        const t2 = setTimeout(() => {
          // un-drop for retransmit (one-shot)
          setDrops((d) => ({ ...d, [kind]: false }));
          send(kind, dir, onArrive);
        }, 700);
        timersRef.current.push(t2);
      }, dur * 0.55);
      timersRef.current.push(t1);
      return;
    }

    const t = setTimeout(() => {
      setLog((L) => [...L, { t: now(), msg: `${labelFor(kind)} received`, tone: 'good' }]);
      onArrive && onArrive();
    }, dur);
    timersRef.current.push(t);
  }, [drops, latency]);

  const start = () => {
    if (running) return;
    reset();
    setRunning(true);
    setStep(1);
    // Sequence: SYN → SYN-ACK → ACK
    setTimeout(() => {
      send('syn', 'cs', () => {
        setStep(2);
        send('synack', 'sc', () => {
          setStep(3);
          send('ack', 'cs', () => {
            setStep(4);
            setRunning(false);
            setLog((L) => [...L, { t: now(), msg: 'Connection established · ESTABLISHED', tone: 'done' }]);
          });
        });
      });
    }, 50);
  };

  // Garbage-collect arrived packets after their animation completes.
  useEffect(() => {
    const id = setInterval(() => {
      const t = performance.now();
      setPackets((p) => p.filter(pk => (t - pk.t0) < pk.dur + 800));
    }, 400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="tcp-demo">
      <div className="tcp-stage">
        <div className="tcp-lane client">
          <div className="lane-label">CLIENT <span>10.0.0.42</span></div>
          <div className="state-pill" data-state={clientState(step)}>{clientState(step)}</div>
        </div>
        <div className="tcp-lane server">
          <div className="lane-label">SERVER <span>substrate.press</span></div>
          <div className="state-pill" data-state={serverState(step)}>{serverState(step)}</div>
        </div>
        <div className="tcp-track">
          {packets.map((pk) => (
            <PacketEl key={pk.id} pk={pk} />
          ))}
        </div>
        <div className="tcp-time-axis">
          <span>t = 0</span>
          <span>roundtrip</span>
          <span>t = {(latency * 3 / 1000).toFixed(2)}s</span>
        </div>
      </div>

      <div className="tcp-controls">
        <div className="tcp-controls-row">
          <button className="btn-primary" onClick={start} disabled={running}>
            {step === 4 ? 'Run again' : running ? 'Running…' : 'Begin handshake'}
          </button>
          <button className="btn-link" onClick={reset}>Reset</button>
          <div className="lat-control">
            <label>One-way latency</label>
            <input type="range" min="300" max="1600" step="100" value={latency}
                   onChange={(e) => setLatency(Number(e.target.value))} disabled={running} />
            <span className="lat-val">{latency}ms</span>
          </div>
        </div>
        <div className="tcp-controls-row drops">
          <span className="drops-label">Drop a packet:</span>
          {[
            ['syn', 'SYN'],
            ['synack', 'SYN · ACK'],
            ['ack', 'ACK'],
          ].map(([k, lbl]) => (
            <label key={k} className={`drop-chip${drops[k] ? ' on' : ''}`}>
              <input type="checkbox" checked={drops[k]}
                     onChange={(e) => setDrops((d) => ({ ...d, [k]: e.target.checked }))} />
              <span>{lbl}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="tcp-log">
        <div className="log-head">
          <span>EVENT LOG</span>
          <span className="log-count">{log.length} entries</span>
        </div>
        <div className="log-body">
          {log.length === 0 && <div className="log-empty">— begin the handshake to record events</div>}
          {log.map((entry, i) => (
            <div key={i} className={`log-row ${entry.tone}`}>
              <span className="log-t">{entry.t}</span>
              <span className="log-msg">{entry.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PacketEl({ pk }) {
  const [phase, setPhase] = useState('start');
  useEffect(() => {
    const t = setTimeout(() => setPhase('end'), 20);
    return () => clearTimeout(t);
  }, []);

  // Direction: 'cs' = client→server (top to bottom), 'sc' = server→client (bottom to top)
  const fromTop = pk.dir === 'cs' ? 12 : 88;
  const toTop   = pk.dir === 'cs' ? 88 : 12;
  const dropTop = pk.dir === 'cs' ? 50 : 50;

  const targetTop = pk.dropped ? dropTop : toTop;

  const labelMap = { syn: 'SYN', synack: 'SYN · ACK', ack: 'ACK' };
  return (
    <div className={`packet ${pk.kind}${pk.dropped ? ' dropped' : ''}`}
         style={{
           top: phase === 'start' ? `${fromTop}%` : `${targetTop}%`,
           transition: `top ${pk.dur * (pk.dropped ? 0.55 : 1)}ms cubic-bezier(.5,.05,.5,.95), opacity 300ms ${pk.dur * (pk.dropped ? 0.55 : 1)}ms`,
           opacity: phase === 'end' && pk.dropped ? 0 : 1,
         }}>
      <span className="packet-label">{labelMap[pk.kind]}</span>
      <span className="packet-seq">seq={1000 + pk.id * 7}</span>
    </div>
  );
}

function clientState(step) {
  return step === 0 ? 'CLOSED' : step === 1 ? 'SYN_SENT' : step === 2 ? 'SYN_SENT' : step === 3 ? 'ESTABLISHED' : 'ESTABLISHED';
}
function serverState(step) {
  return step === 0 ? 'LISTEN' : step === 1 ? 'LISTEN' : step === 2 ? 'SYN_RECEIVED' : step === 3 ? 'SYN_RECEIVED' : 'ESTABLISHED';
}
function labelFor(kind) {
  return { syn: 'SYN', synack: 'SYN·ACK', ack: 'ACK' }[kind];
}
function now() {
  const d = new Date();
  return d.toTimeString().slice(0, 8) + '.' + String(d.getMilliseconds()).padStart(3, '0');
}

// ─── Demo Detail page ──────────────────────────────────────────────────────
function DemoDetailPage({ slug, variant }) {
  const demo = DEMOS.find((d) => d.slug === slug) || DEMOS[0];
  return (
    <article className={`detail detail-${variant}`}>
      <div className="detail-back">
        <a onClick={() => navTo('#/')}>← Back to the index</a>
      </div>
      <header className="detail-head">
        <div className="detail-meta">
          <span className="kicker">{demo.kicker}</span>
          <span className="dot">·</span>
          <span>{demo.read}</span>
          <span className="dot">·</span>
          <span>{demo.date}</span>
        </div>
        <h1>{demo.title}</h1>
        <p className="detail-dek">{demo.dek}</p>
        <div className="detail-byline">
          <span>By {demo.author}</span>
          <span className="dot">·</span>
          <span>Illustrations by the editors</span>
        </div>
      </header>

      <div className="detail-rule" />

      <section className="detail-prose">
        <p className="dropcap">
          <span className="dc">A</span> connection, in the language of the internet, is a
          mutual hallucination. There is no wire reserved for you, no circuit closed
          on your behalf. When your browser asks <em>substrate.press</em> for a page,
          it is asking a stranger, in a busy room, to keep track of a conversation
          that may take several seconds and several thousand bytes.
        </p>
        <p>
          The <em>three-way handshake</em> is how the two sides agree to remember
          each other. It is small. It is precise. It is, when you watch it happen,
          oddly polite.
        </p>
      </section>

      {demo.interactive && (
        <section className="detail-demo">
          <div className="demo-head">
            <span className="kicker">— Demonstration</span>
            <h2>Watch a connection form</h2>
            <p>Set the latency, optionally drop a packet, and follow the three messages.</p>
          </div>
          <TCPHandshakeDemo />
        </section>
      )}

      <section className="detail-prose">
        <h3>What just happened</h3>
        <p>
          The client sent a <code>SYN</code> &mdash; a single packet whose only
          job is to propose a starting sequence number. The server replied with
          a <code>SYN · ACK</code>, acknowledging the client&rsquo;s number and
          proposing its own. The client&rsquo;s final <code>ACK</code> is the
          contract: <em>I will remember the numbers you proposed; please remember mine</em>.
        </p>
        <p>
          If you dropped the second packet above, you saw the client wait, then
          send <code>SYN</code> again. TCP&rsquo;s contract with you is not that
          packets will arrive&mdash;only that, eventually, they will be acknowledged
          to have arrived, or the connection will be torn down honestly.
        </p>
        <h3>Why this is interesting</h3>
        <p>
          Almost every other protocol you use sits on top of this exchange. HTTPS
          adds a second handshake&mdash;a cryptographic one&mdash;immediately after.
          QUIC tries to fold both into a single round trip. Every millisecond you
          shave off this dance is a millisecond your page loads faster, multiplied
          by every connection in the world.
        </p>
      </section>

      <aside className="detail-aside">
        <h6>Further reading</h6>
        <ul>
          <li><a>RFC 9293 — Transmission Control Protocol</a></li>
          <li><a>The QUIC handshake, in two acts</a></li>
          <li><a>What a packet capture looks like at scale</a></li>
        </ul>
      </aside>

      <section className="detail-related">
        <h3>Continue reading</h3>
        <div className="related-grid">
          {DEMOS.filter((d) => d.slug !== slug).slice(0, 3).map((d) => (
            <article key={d.slug} className="related" onClick={() => navTo('#/demo/' + d.slug)}>
              <span className="kicker">{d.kicker}</span>
              <h4>{d.title}</h4>
              <span className="read">{d.read}</span>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}

// ─── Page composers ────────────────────────────────────────────────────────
function LandingA() {
  return (
    <>
      <MastheadA route="#/" />
      <main>
        <HeroA />
        <div className="content-rule" />
        <DemoGridA />
        <ManifestoA />
        <NewsletterA />
      </main>
      <FooterA />
    </>
  );
}

function LandingB() {
  return (
    <>
      <MastheadB route="#/" />
      <main>
        <HeroB />
        <DemoListB />
        <ManifestoB />
        <TopicStripB />
      </main>
      <FooterB />
    </>
  );
}

function DemoPage({ slug, variant }) {
  return (
    <>
      {variant === 'a' ? <MastheadA /> : <MastheadB />}
      <main>
        <DemoDetailPage slug={slug} variant={variant} />
      </main>
      {variant === 'a' ? <FooterA /> : <FooterB />}
    </>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "variant": "b",
  "density": "regular",
  "showGrid": false
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const hash = useHashRoute();

  // Apply variant + density to <html>
  useEffect(() => {
    document.documentElement.dataset.variant = t.variant;
    document.documentElement.dataset.density = t.density;
    document.documentElement.dataset.grid = t.showGrid ? '1' : '0';
  }, [t.variant, t.density, t.showGrid]);

  let view;
  if (hash.startsWith('#/demo/')) {
    const slug = hash.replace('#/demo/', '');
    view = <DemoPage slug={slug} variant={t.variant} />;
  } else {
    view = t.variant === 'a' ? <LandingA /> : <LandingB />;
  }

  return (
    <>
      {view}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Direction" />
        <TweakRadio label="Variant" value={t.variant}
                    options={[{ value: 'a', label: 'A · Paper' }, { value: 'b', label: 'B · Press' }]}
                    onChange={(v) => setTweak('variant', v)} />
        <TweakRadio label="Density" value={t.density}
                    options={['compact', 'regular', 'comfy']}
                    onChange={(v) => setTweak('density', v)} />
        <TweakSection label="Navigate" />
        <TweakButton label="→ Landing" onClick={() => navTo('#/')} secondary />
        <TweakButton label="→ Demo: TCP handshake" onClick={() => navTo('#/demo/tcp-handshake')} secondary />
        <TweakSection label="Debug" />
        <TweakToggle label="Show baseline grid" value={t.showGrid}
                     onChange={(v) => setTweak('showGrid', v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
