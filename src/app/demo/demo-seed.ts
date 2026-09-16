/**
 * Seed data for demo mode.
 *
 * This is the catalogue a visitor sees when the app runs with no backend. It
 * deliberately looks like a working quincaillerie rather than a handful of
 * placeholder rows: enough products to paginate, stock levels that span the
 * whole red/amber/green range on the stock bars, and a year of sales so the
 * dashboard charts have a real shape.
 *
 * Category names must match the icon filenames under
 * assets/img/icons/common/<Category>.png - the product table builds that path
 * from the category string, so an accented 'Platrerie' would 404.
 */

export interface DemoCategory {
  id: string;
  name: string;
  img: string;
}

export interface DemoProduct {
  ref: string;
  name: string;
  img: string;
  details: string;
  price: number;
  category: string;
  supplier: string;
  deposit: string;
  qtestock: number;
  qtesold: number;
}

export interface DemoClient {
  id: string;
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  address: string;
}

export interface DemoProvider {
  id: string;
  name: string;
  phone: number;
  email: string;
  adresse: string;
}

export interface DemoDeposit {
  id: string;
  name: string;
  capacity: number;
  used: number;
}

export interface DemoSale {
  id: string;
  date: string;
  amount: number;
  discount: number;
  payed: number;
  clientfn: string;
  clientln: string;
}

export interface DemoStaff {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phone: number;
  email: string;
  adresse: string;
}

export interface DemoData {
  categories: DemoCategory[];
  products: DemoProduct[];
  clients: DemoClient[];
  providers: DemoProvider[];
  deposits: DemoDeposit[];
  sales: DemoSale[];
  staff: DemoStaff[];
}

export const DEMO_CATEGORIES: DemoCategory[] = [
  { id: 'CAT-01', name: 'Maconnerie',    img: 'Maconnerie.png' },
  { id: 'CAT-02', name: 'Plomberie',     img: 'Plomberie.png' },
  { id: 'CAT-03', name: 'Peinture',      img: 'Peinture.png' },
  { id: 'CAT-04', name: 'Electronique',  img: 'Electronique.png' },
  { id: 'CAT-05', name: 'Climatisation', img: 'Climatisation.png' },
  { id: 'CAT-06', name: 'Mecanique',     img: 'Mecanique.png' },
  { id: 'CAT-07', name: 'Platrerie',     img: 'Platrerie.png' },
  { id: 'CAT-08', name: 'Domestique',    img: 'Domestique.png' },
];

// Images are the eight photos already bundled under assets/img/products.
const IMG = {
  ciment: '514ofwJ1JVL._AC_SY355_.jpg',
  clou: '61tYal6UQ9L._AC_SL1360_.jpg',
  filBarbele: 'ae235.jpg',
  peintureMatt: 'dulux-flat-matt.jpg',
  multicouche: 'Pex-Multilayer.jpg',
  enduit: 'silo-MIN.jpg',
  tuyauInox: 'stainless-steel-water-pipe-500x500.jpg',
  clousFil: 'wire-nails-500x500.jpg',
};

export const DEMO_PRODUCTS: DemoProduct[] = [
  // --- Maconnerie ---
  { ref: 'MAC-1001', name: 'Ciment gris CEM II', img: IMG.ciment, details: 'Sac 50 kg', price: 12.500, category: 'Maconnerie', supplier: 'Cimenterie de Bizerte', deposit: 'Depot Central', qtestock: 320, qtesold: 1240 },
  { ref: 'MAC-1002', name: 'Ciment blanc', img: IMG.ciment, details: 'Sac 25 kg', price: 18.900, category: 'Maconnerie', supplier: 'Cimenterie de Bizerte', deposit: 'Depot Central', qtestock: 86, qtesold: 310 },
  { ref: 'MAC-1003', name: 'Clou de charpente', img: IMG.clou, details: '70 mm, boite 5 kg', price: 14.200, category: 'Maconnerie', supplier: 'Metal Sud', deposit: 'Depot Nord', qtestock: 42, qtesold: 188 },
  { ref: 'MAC-1004', name: 'Clou a beton', img: IMG.clousFil, details: '50 mm, boite 2 kg', price: 9.600, category: 'Maconnerie', supplier: 'Metal Sud', deposit: 'Depot Nord', qtestock: 12, qtesold: 205 },
  { ref: 'MAC-1005', name: 'Fil barbele galvanise', img: IMG.filBarbele, details: 'Rouleau 100 m', price: 62.000, category: 'Maconnerie', supplier: 'Metal Sud', deposit: 'Depot Sud', qtestock: 18, qtesold: 47 },
  { ref: 'MAC-1006', name: 'Sable de construction', img: IMG.ciment, details: 'Big bag 1 m3', price: 45.000, category: 'Maconnerie', supplier: 'Carriere El Fahs', deposit: 'Depot Chantier', qtestock: 64, qtesold: 402 },

  // --- Plomberie ---
  { ref: 'PLB-2001', name: 'Tube multicouche', img: IMG.multicouche, details: 'Diam. 20 mm, 50 m', price: 118.000, category: 'Plomberie', supplier: 'HydroTech Tunisie', deposit: 'Depot Central', qtestock: 27, qtesold: 94 },
  { ref: 'PLB-2002', name: 'Tube multicouche', img: IMG.multicouche, details: 'Diam. 16 mm, 50 m', price: 92.000, category: 'Plomberie', supplier: 'HydroTech Tunisie', deposit: 'Depot Central', qtestock: 35, qtesold: 121 },
  { ref: 'PLB-2003', name: 'Conduite inox', img: IMG.tuyauInox, details: 'Diam. 200 mm, 6 m', price: 265.000, category: 'Plomberie', supplier: 'HydroTech Tunisie', deposit: 'Depot Sud', qtestock: 8, qtesold: 22 },
  { ref: 'PLB-2004', name: 'Raccord laiton', img: IMG.tuyauInox, details: 'Diam. 20 mm, lot 10', price: 34.500, category: 'Plomberie', supplier: 'Sanitaire Plus', deposit: 'Depot Nord', qtestock: 140, qtesold: 356 },
  { ref: 'PLB-2005', name: 'Robinet melangeur', img: IMG.tuyauInox, details: 'Chrome, evier', price: 78.900, category: 'Plomberie', supplier: 'Sanitaire Plus', deposit: 'Depot Central', qtestock: 31, qtesold: 143 },

  // --- Peinture ---
  { ref: 'PEI-3001', name: 'Peinture mate blanche', img: IMG.peintureMatt, details: 'Pot 15 L', price: 142.000, category: 'Peinture', supplier: 'Astral Peintures', deposit: 'Depot Central', qtestock: 46, qtesold: 218 },
  { ref: 'PEI-3002', name: 'Peinture satinee', img: IMG.peintureMatt, details: 'Pot 5 L', price: 68.500, category: 'Peinture', supplier: 'Astral Peintures', deposit: 'Depot Central', qtestock: 73, qtesold: 190 },
  { ref: 'PEI-3003', name: 'Enduit etanche', img: IMG.enduit, details: 'Sac 25 kg', price: 54.000, category: 'Peinture', supplier: 'Astral Peintures', deposit: 'Depot Sud', qtestock: 22, qtesold: 167 },
  { ref: 'PEI-3004', name: 'Sous-couche universelle', img: IMG.peintureMatt, details: 'Pot 10 L', price: 89.000, category: 'Peinture', supplier: 'Astral Peintures', deposit: 'Depot Nord', qtestock: 5, qtesold: 128 },

  // --- Platrerie ---
  { ref: 'PLA-4001', name: 'Platre de construction', img: IMG.enduit, details: 'Sac 40 kg', price: 16.800, category: 'Platrerie', supplier: 'Carriere El Fahs', deposit: 'Depot Chantier', qtestock: 210, qtesold: 640 },
  { ref: 'PLA-4002', name: 'Enduit de lissage', img: IMG.enduit, details: 'Sac 25 kg', price: 28.400, category: 'Platrerie', supplier: 'Carriere El Fahs', deposit: 'Depot Chantier', qtestock: 95, qtesold: 274 },

  // --- Electronique ---
  { ref: 'ELE-5001', name: 'Cable electrique 2.5 mm2', img: IMG.filBarbele, details: 'Couronne 100 m', price: 96.000, category: 'Electronique', supplier: 'ElectroPro', deposit: 'Depot Nord', qtestock: 58, qtesold: 231 },
  { ref: 'ELE-5002', name: 'Disjoncteur 20 A', img: IMG.clou, details: 'Bipolaire', price: 42.300, category: 'Electronique', supplier: 'ElectroPro', deposit: 'Depot Central', qtestock: 88, qtesold: 176 },
  { ref: 'ELE-5003', name: 'Interrupteur double', img: IMG.clou, details: 'Blanc, encastre', price: 12.900, category: 'Electronique', supplier: 'ElectroPro', deposit: 'Depot Central', qtestock: 164, qtesold: 402 },

  // --- Climatisation ---
  { ref: 'CLI-6001', name: 'Split 12000 BTU', img: IMG.tuyauInox, details: 'Inverter, classe A', price: 1450.000, category: 'Climatisation', supplier: 'ClimaFroid', deposit: 'Depot Sud', qtestock: 14, qtesold: 38 },
  { ref: 'CLI-6002', name: 'Gaine isolee', img: IMG.multicouche, details: 'Diam. 125 mm, 10 m', price: 87.000, category: 'Climatisation', supplier: 'ClimaFroid', deposit: 'Depot Sud', qtestock: 26, qtesold: 61 },

  // --- Mecanique ---
  { ref: 'MEC-7001', name: 'Boulonnerie inox M10', img: IMG.clousFil, details: 'Lot de 100', price: 46.500, category: 'Mecanique', supplier: 'Metal Sud', deposit: 'Depot Nord', qtestock: 72, qtesold: 194 },
  { ref: 'MEC-7002', name: 'Disque a tronconner', img: IMG.clou, details: 'Diam. 230 mm, lot 5', price: 24.000, category: 'Mecanique', supplier: 'Metal Sud', deposit: 'Depot Central', qtestock: 3, qtesold: 287 },

  // --- Domestique ---
  { ref: 'DOM-8001', name: 'Escabeau aluminium', img: IMG.tuyauInox, details: '5 marches', price: 129.000, category: 'Domestique', supplier: 'Maison & Outils', deposit: 'Depot Central', qtestock: 19, qtesold: 57 },
  { ref: 'DOM-8002', name: 'Bache de protection', img: IMG.peintureMatt, details: '4 x 5 m', price: 21.500, category: 'Domestique', supplier: 'Maison & Outils', deposit: 'Depot Nord', qtestock: 112, qtesold: 240 },
];

export const DEMO_CLIENTS: DemoClient[] = [
  { id: 'CLI-0001', firstName: 'Amira',   lastName: 'Ben Salah',  phone: 21556781, email: 'amira.bensalah@gmail.com',    address: '12 Rue de Carthage, Tunis' },
  { id: 'CLI-0002', firstName: 'Karim',   lastName: 'Trabelsi',   phone: 22314598, email: 'k.trabelsi@batiplus.tn',      address: '45 Avenue Habib Bourguiba, Sousse' },
  { id: 'CLI-0003', firstName: 'Sonia',   lastName: 'Mejri',      phone: 98457120, email: 'sonia.mejri@outlook.com',     address: '8 Rue Ibn Khaldoun, Sfax' },
  { id: 'CLI-0004', firstName: 'Hatem',   lastName: 'Gharbi',     phone: 24887563, email: 'hatem.gharbi@gmail.com',      address: '3 Rue des Oliviers, Nabeul' },
  { id: 'CLI-0005', firstName: 'Leila',   lastName: 'Haddad',     phone: 55210394, email: 'leila.haddad@constructa.tn',  address: '27 Avenue de la Liberte, Bizerte' },
  { id: 'CLI-0006', firstName: 'Mehdi',   lastName: 'Chaabane',   phone: 21990476, email: 'mehdi.chaabane@gmail.com',    address: '61 Rue de Marseille, Tunis' },
  { id: 'CLI-0007', firstName: 'Nadia',   lastName: 'Ferjani',    phone: 97336208, email: 'n.ferjani@yahoo.fr',          address: '14 Rue Farhat Hached, Monastir' },
  { id: 'CLI-0008', firstName: 'Youssef', lastName: 'Bouazizi',   phone: 26154870, email: 'youssef.b@promobat.tn',       address: '92 Avenue Taieb Mhiri, Gabes' },
  { id: 'CLI-0009', firstName: 'Ines',    lastName: 'Karoui',     phone: 23678145, email: 'ines.karoui@gmail.com',       address: '5 Rue du Lac, La Marsa' },
  { id: 'CLI-0010', firstName: 'Slim',    lastName: 'Nefzaoui',   phone: 54902317, email: 'slim.nefzaoui@gmail.com',     address: '38 Rue Ali Belhouane, Kairouan' },
  { id: 'CLI-0011', firstName: 'Rania',   lastName: 'Zouari',     phone: 29744106, email: 'rania.zouari@archi.tn',       address: '7 Rue Hedi Chaker, Sfax' },
  { id: 'CLI-0012', firstName: 'Anis',    lastName: 'Dridi',      phone: 22508963, email: 'anis.dridi@gmail.com',        address: '19 Avenue Mohamed V, Tunis' },
];

export const DEMO_PROVIDERS: DemoProvider[] = [
  { id: 'FRN-001', name: 'Cimenterie de Bizerte', phone: 72431200, email: 'commandes@cimbizerte.tn',   adresse: 'Zone Industrielle, Bizerte' },
  { id: 'FRN-002', name: 'Metal Sud',             phone: 74228915, email: 'contact@metalsud.tn',       adresse: 'Route de Gabes km 4, Sfax' },
  { id: 'FRN-003', name: 'HydroTech Tunisie',     phone: 71856340, email: 'ventes@hydrotech.tn',       adresse: 'Rue de l Usine, Ben Arous' },
  { id: 'FRN-004', name: 'Astral Peintures',      phone: 73402178, email: 'pro@astralpeintures.tn',    adresse: 'Zone Industrielle, Sousse' },
  { id: 'FRN-005', name: 'ElectroPro',            phone: 71339604, email: 'contact@electropro.tn',     adresse: '22 Rue de Russie, Tunis' },
  { id: 'FRN-006', name: 'ClimaFroid',            phone: 70281455, email: 'service@climafroid.tn',     adresse: 'Avenue de Carthage, Ariana' },
  { id: 'FRN-007', name: 'Carriere El Fahs',      phone: 72190863, email: 'carriere@elfahs.tn',        adresse: 'Route de Zaghouan, El Fahs' },
  { id: 'FRN-008', name: 'Maison & Outils',       phone: 71604227, email: 'info@maisonoutils.tn',      adresse: '5 Rue de Grece, Tunis' },
];

export const DEMO_DEPOSITS: DemoDeposit[] = [
  { id: 'DEP-01', name: 'Depot Central',  capacity: 1200, used: 940 },
  { id: 'DEP-02', name: 'Depot Nord',     capacity: 800,  used: 415 },
  { id: 'DEP-03', name: 'Depot Sud',      capacity: 650,  used: 602 },
  { id: 'DEP-04', name: 'Depot Chantier', capacity: 500,  used: 180 },
  { id: 'DEP-05', name: 'Depot Ariana',   capacity: 350,  used: 121 },
  { id: 'DEP-06', name: 'Reserve Atelier', capacity: 220, used: 96 },
];

export const DEMO_STAFF: DemoStaff[] = [
  { id: 'EMP-001', firstname: 'Mohamed', lastname: 'Salah',    username: 'msalah',   password: 'demo1234', phone: 98112233, email: 'm.salah@laborhelm.tn',   adresse: '12 Rue de Rome, Tunis' },
  { id: 'EMP-002', firstname: 'Fatma',   lastname: 'Aloui',    username: 'faloui',   password: 'demo1234', phone: 22445566, email: 'f.aloui@laborhelm.tn',   adresse: '4 Rue Ibn Sina, Ariana' },
  { id: 'EMP-003', firstname: 'Walid',   lastname: 'Jebali',   username: 'wjebali',  password: 'demo1234', phone: 55778899, email: 'w.jebali@laborhelm.tn',  adresse: '31 Avenue de Paris, Tunis' },
  { id: 'EMP-004', firstname: 'Syrine',  lastname: 'Mansouri', username: 'smansouri', password: 'demo1234', phone: 24336611, email: 's.mansouri@laborhelm.tn', adresse: '9 Rue des Jasmins, La Marsa' },
  { id: 'EMP-005', firstname: 'Bilel',   lastname: 'Rekik',    username: 'brekik',   password: 'demo1234', phone: 29880145, email: 'b.rekik@laborhelm.tn',   adresse: '17 Rue Mongi Slim, Sousse' },
  { id: 'EMP-006', firstname: 'Olfa',    lastname: 'Belhaj',   username: 'obelhaj',  password: 'demo1234', phone: 21607394, email: 'o.belhaj@laborhelm.tn',  adresse: '23 Rue de Carthage, Sfax' },
];

/**
 * Builds a year of sales ending today.
 *
 * Generated rather than typed out so the demo never shows stale dates, and so
 * the dashboard has enough points to draw a trend. The pseudo-random source is
 * seeded, so every visitor sees the same numbers and a reload does not
 * reshuffle the table.
 */
function buildSales(clients: DemoClient[], count: number): DemoSale[] {
  // Mulberry32: small, deterministic, good enough for sample data.
  let seed = 0x5eed1234;
  const rand = () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const pad = (n: number) => String(n).padStart(2, '0');
  const sales: DemoSale[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const client = clients[Math.floor(rand() * clients.length)];

    const when = new Date(today);
    // Spread the sales back over roughly a year, newest first.
    when.setDate(when.getDate() - Math.floor((i / count) * 330 + rand() * 6));
    when.setHours(8 + Math.floor(rand() * 10), Math.floor(rand() * 60), 0, 0);

    const amount = Math.round((40 + rand() * 1850) * 1000) / 1000;
    const discount = [0, 0, 0, 5, 10, 15][Math.floor(rand() * 6)];
    // Most sales are settled; a few stay open so the "impayee" state is
    // visible in the table without dominating it.
    const payed = rand() > 0.22 ? 1 : 0;

    sales.push({
      id: String(900000 + i * 37 + Math.floor(rand() * 30)),
      date: `${pad(when.getDate())}/${pad(when.getMonth() + 1)}/${when.getFullYear()} ` +
            `${pad(when.getHours())}:${pad(when.getMinutes())}`,
      amount,
      discount,
      payed,
      clientfn: client.firstName,
      clientln: client.lastName,
    });
  }

  return sales;
}

export const DEMO_SALES: DemoSale[] = buildSales(DEMO_CLIENTS, 48);

/** A fresh, unshared copy of the whole dataset. */
export function buildDemoData(): DemoData {
  // Deep clone so a page mutating its rows cannot write back into these
  // module-level constants and survive a reset.
  const clone = <T>(rows: T[]): T[] => rows.map(row => ({ ...row }));

  return {
    categories: clone(DEMO_CATEGORIES),
    products: clone(DEMO_PRODUCTS),
    clients: clone(DEMO_CLIENTS),
    providers: clone(DEMO_PROVIDERS),
    deposits: clone(DEMO_DEPOSITS),
    sales: clone(DEMO_SALES),
    staff: clone(DEMO_STAFF),
  };
}
