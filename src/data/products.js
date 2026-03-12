import heroTacos from '../assets/images/hero_tacos.png';
import tacoMaciza from '../assets/images/taco_maciza.png';
import tacoSurtida from '../assets/images/taco_surtida.png';
import tacoCuero from '../assets/images/taco_cuero.png';
import tacoBuche from '../assets/images/taco_buche.png';
import tacoCachete from '../assets/images/taco_cachete.png';
import tacoTrompa from '../assets/images/taco_trompa.png';
import tacoOreja from '../assets/images/taco_oreja.png';
import tacoChamorro from '../assets/images/taco_chamorro.png';

import kiloMaciza from '../assets/images/kilo_maciza.png';
import gorditaImg from '../assets/images/gordita_carnitas.png';
import gorditaCuero from '../assets/images/gordita_cuero.png';

import tortaImg from '../assets/images/torta_carnitas.png';
import tortaCuero from '../assets/images/torta_cuero.png';
import tortaBuche from '../assets/images/torta_buche.png';
import tortaSurtida from '../assets/images/torta_surtida.png';
import tortaCachete from '../assets/images/torta_cachete.png';
import tortaTrompa from '../assets/images/torta_trompa.png';
import tortaOreja from '../assets/images/torta_oreja.png';
import tortaChamorro from '../assets/images/torta_chamorro.png';

import bebidasImg from '../assets/images/bebidas.png';
import imgMexicanCoke from '../assets/images/mexican_coke.png';
import imgJarritos from '../assets/images/jarritos.png';
import imgAguasFrescas from '../assets/images/aguas_frescas.png';
import salsaEspecial from '../assets/images/salsa_especial.png';

import userSidral from '../assets/images/user_sidral.png';
import userCoco from '../assets/images/user_coco.png';
import userJamaica from '../assets/images/user_jamaica.png';
import userBoing from '../assets/images/user_boing.png';
import userCocaCola from '../assets/images/user_coca_cola.png';
import userHorchata from '../assets/images/user_horchata.png';
import userJarritoMandarina from '../assets/images/user_jarrito_mandarina.png';
import userJarritoTamarindo from '../assets/images/user_jarrito_tamarindo.png';
import userManzanitaSol from '../assets/images/user_manzanita_sol.png';
import userPepsi from '../assets/images/user_pepsi.png';
import userSalsaRoja from '../assets/images/user_salsa_roja.png';
import userSalsaVerde from '../assets/images/user_salsa_verde.png';
import userSprite from '../assets/images/user_sprite.png';

// Cortes base del Menú de Lona
const cortes = [
    { id: 'maciza', name: 'Maciza', desc: 'Pura carne magra, jugosa y suave.' },
    { id: 'cuero', name: 'Cuero', desc: 'Cuerito tierno y bien sazonado que se deshace.' },
    { id: 'buche', name: 'Buche', desc: 'Suave y delicioso estomago de cerdo confitado.' },
    { id: 'surtido', name: 'Surtido', desc: 'Mezcla perfecta de maciza, cuerito y demás.' },
    { id: 'cachete', name: 'Cachete', desc: 'Carne extra suave, pura suavidad de la carita.' },
    { id: 'trompa', name: 'Trompa', desc: 'Con textura firme y un sabor intenso único.' },
    { id: 'oreja', name: 'Oreja', desc: 'Cartílago crujiente y sabroso, el favorito de conocedores.' },
    { id: 'chamorro', name: 'Chamorro', desc: 'La pierna jugosa y rica en sabor asombroso.' },
];

const generatedProducts = [];
let initialId = 100;

const tacoImagesMap = {
    maciza: tacoMaciza, cuero: tacoCuero, buche: tacoBuche, surtido: tacoSurtida,
    cachete: tacoCachete, trompa: tacoTrompa, oreja: tacoOreja, chamorro: tacoChamorro
};

const tortaImagesMap = {
    maciza: tortaImg, cuero: tortaCuero, buche: tortaBuche, surtido: tortaSurtida,
    cachete: tortaCachete, trompa: tortaTrompa, oreja: tortaOreja, chamorro: tortaChamorro
};

const gorditaImagesMap = {
    cuero: gorditaCuero
};

// Generar combinaciones de platillos por cada corte
cortes.forEach(corte => {
    generatedProducts.push({
        id: initialId++,
        name: `Taco de ${corte.name}`,
        description: `Taco individual de ${corte.desc}`,
        price: 35.00,
        image: tacoImagesMap[corte.id] || heroTacos,
        category: 'Tacos'
    });

    generatedProducts.push({
        id: initialId++,
        name: `Torta de ${corte.name}`,
        description: `Bolillo crujiente relleno de ${corte.name}, frijoles y más.`,
        price: 85.00,
        image: tortaImagesMap[corte.id] || tortaImg,
        category: 'Tortas'
    });

    generatedProducts.push({
        id: initialId++,
        name: `Gordita de ${corte.name}`,
        description: `Masa frita abierta y rellena de ${corte.name} con guarnición.`,
        price: 55.00,
        image: gorditaImagesMap[corte.id] || gorditaImg,
        category: 'Gorditas'
    });

    generatedProducts.push({
        id: initialId++,
        name: `1 Kilo de ${corte.name}`,
        description: `Un kilo de ${corte.name} listo para taquear en familia.`,
        price: 450.00,
        image: kiloMaciza,
        category: 'Por Kilo'
    });
});

export const products = [
    ...generatedProducts,
    // ── Refrescos (populares en Cancún, Q.Roo) ──────────────────────
    { id: 10,  name: 'Coca-Cola',             description: 'La clásica Coca-Cola bien fría. La #1 en México.',                    price: 25.00, image: userCocaCola, category: 'Bebidas' },
    { id: 200, name: 'Pepsi',                 description: 'Pepsi fría y refrescante para acompañar tu pedido.',                   price: 25.00, image: userPepsi, category: 'Bebidas' },
    { id: 201, name: 'Sprite',                description: 'Sprite limón‑lima, perfecta para el calor caribeño.',                  price: 25.00, image: userSprite, category: 'Bebidas' },
    { id: 202, name: 'Jarritos Tamarindo',    description: 'Jarritos de tamarindo, favorito del sureste mexicano.',                price: 25.00, image: userJarritoTamarindo, category: 'Bebidas' },
    { id: 203, name: 'Jarritos Mandarina',    description: 'Jarritos de mandarina, el sabor tropical de Quintana Roo.',           price: 25.00, image: userJarritoMandarina, category: 'Bebidas' },
    { id: 204, name: 'Manzanita Sol',         description: 'Refresco de manzana, muy popular en el Caribe mexicano.',             price: 25.00, image: userManzanitaSol, category: 'Bebidas' },
    { id: 205, name: 'Sidral Mundet',         description: 'El sidral de manzana más clásico de México.',                         price: 25.00, image: userSidral, category: 'Bebidas' },
    { id: 206, name: 'Boing de Guayaba o Mango', description: 'Jugo Boing refrescante sabor guayaba o mango.',              price: 25.00, image: userBoing, category: 'Bebidas' },
    { id: 207, name: 'Agua de Coco Natural',  description: 'Agua de coco 100% natural, típica de la zona costera de Cancún.',     price: 30.00, image: userCoco, category: 'Bebidas' },
    // ── Aguas naturales ──────────────────────────────────────────────
    { id: 11,  name: 'Agua de Horchata (500ml)', description: 'Horchata casera con canela, bien fría.',                           price: 30.00, image: userHorchata, category: 'Bebidas' },
    { id: 208, name: 'Agua de Jamaica (500ml)',  description: 'Jamaica natural con toque de limón, recién preparada.',             price: 30.00, image: userJamaica, category: 'Bebidas' },
    // ── Complementos ─────────────────────────────────────────────────
    {
        id: 6,
        name: 'Salsa Roja Especial (250ml)',
        description: 'Auténtica salsa de chile de árbol asado y limón.',
        price: 35.00,
        image: userSalsaRoja,
        category: 'Complementos'
    },
    {
        id: 300,
        name: 'Salsa Verde Clásica (250ml)',
        description: 'Salsa verde de tomatillo fresco y un toque de habanero.',
        price: 35.00,
        image: userSalsaVerde,
        category: 'Complementos'
    }
];
