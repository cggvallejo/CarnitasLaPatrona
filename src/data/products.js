import heroTacos from '../assets/images/hero_tacos.png';
import kiloMaciza from '../assets/images/kilo_maciza.png';
import tacoMaciza from '../assets/images/taco_maciza.png';
import tacoSurtida from '../assets/images/taco_surtida.png';
import bebidasImg from '../assets/images/bebidas.png';
import salsaEspecial from '../assets/images/salsa_especial.png';

import heroTacos from '../assets/images/hero_tacos.png';
import kiloMaciza from '../assets/images/kilo_maciza.png';
import gorditaImg from '../assets/images/taca_surtida.png'; // Fallback
import tortaImg from '../assets/images/hero_tacos.png'; // Fallback
import bebidasImg from '../assets/images/bebidas.png';
import salsaEspecial from '../assets/images/salsa_especial.png';

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

// Generar combinaciones de platillos por cada corte
cortes.forEach(corte => {
    generatedProducts.push({
        id: initialId++,
        name: `Taco de ${corte.name}`,
        description: `Taco individual de ${corte.desc}`,
        price: 35.00,
        image: heroTacos,
        category: 'Tacos'
    });
    
    generatedProducts.push({
        id: initialId++,
        name: `Torta de ${corte.name}`,
        description: `Bolillo crujiente relleno de ${corte.name}, frijoles y más.`,
        price: 85.00,
        image: tortaImg,
        category: 'Tortas'
    });

    generatedProducts.push({
        id: initialId++,
        name: `Gordita de ${corte.name}`,
        description: `Masa frita abierta y rellena de ${corte.name} con guarnición.`,
        price: 55.00,
        image: gorditaImg,
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
    {
        id: 10,
        name: 'Refrescos',
        description: 'Coca-Cola, Sprite, Sidral Mundet. Elige tu favorito.',
        price: 25.00,
        image: bebidasImg,
        category: 'Bebidas'
    },
    {
        id: 11,
        name: 'Aguas Naturales (Medio Litro)',
        description: 'Horchata o Jamaica natural, recién hecha para acompañar.',
        price: 30.00,
        image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=400',
        category: 'Bebidas'
    },
    {
        id: 6,
        name: 'Salsa Especial (250ml)',
        description: 'Nuestra famosa salsa verde de habanero y aguacate.',
        price: 35.00,
        image: salsaEspecial,
        category: 'Complementos'
    }
];
