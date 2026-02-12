import { DataSource } from "typeorm";
import { Event } from "../events/event.entity";
import { Order } from "../orders/order.entity";

const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "ticketnow",
    entities: [Event, Order],
    synchronize: true,
});

const events: Partial<Event>[] = [
    {
        title: "Rock in Rio 2025",
        description:
            "O maior festival de música do mundo retorna ao Parque Olímpico com um lineup que mistura rock clássico, pop internacional e artistas nacionais consagrados. Três dias de shows inesquecíveis em palcos monumentais.",
        date: new Date("2025-09-15T16:00:00"),
        location: "Parque Olímpico, Rio de Janeiro - RJ",
        price: 595.0,
        imageUrl: "https://picsum.photos/seed/rockinrio/800/400",
        capacity: 100000,
        availableTickets: 2500,
        category: "Festival",
    },
    {
        title: "Lollapalooza Brasil 2025",
        description:
            "Festival multicultural no Autódromo de Interlagos com mais de 70 atrações distribuídas em 4 palcos. Gastronomia, arte urbana e experiências imersivas complementam a programação musical.",
        date: new Date("2025-03-28T12:00:00"),
        location: "Autódromo de Interlagos, São Paulo - SP",
        price: 480.0,
        imageUrl: "https://picsum.photos/seed/lollapalooza/800/400",
        capacity: 75000,
        availableTickets: 8200,
        category: "Festival",
    },
    {
        title: "Fábio Jr. - Turnê 50 Anos",
        description:
            "O cantor celebra cinco décadas de carreira com um show repleto de sucessos que marcaram gerações. De 'Pai' a 'Alma Gêmea', uma noite de pura emoção e nostalgia.",
        date: new Date("2025-04-12T21:00:00"),
        location: "Espaço das Américas, São Paulo - SP",
        price: 220.0,
        imageUrl: "https://picsum.photos/seed/fabiojr/800/400",
        capacity: 8000,
        availableTickets: 340,
        category: "Show",
    },
    {
        title: "Hamlet - Cia. Brasileira de Teatro",
        description:
            "Releitura contemporânea do clássico de Shakespeare com cenografia minimalista e iluminação expressionista. A Cia. Brasileira de Teatro traz uma abordagem visceral e política ao texto original.",
        date: new Date("2025-05-20T19:30:00"),
        location: "Teatro Alfa, São Paulo - SP",
        price: 180.0,
        imageUrl: "https://picsum.photos/seed/hamlet/800/400",
        capacity: 1100,
        availableTickets: 15,
        category: "Teatro",
    },
    {
        title: "Stand-Up: Comediantes da Noite",
        description:
            "Os maiores nomes da comédia stand-up em uma noite única. Humor ácido, observações do cotidiano e muito improviso com artistas que lotam casas por todo o país.",
        date: new Date("2025-04-05T20:00:00"),
        location: "Casa de Cultura Laura Alvim, Rio de Janeiro - RJ",
        price: 90.0,
        imageUrl: "https://picsum.photos/seed/standup/800/400",
        capacity: 350,
        availableTickets: 0,
        category: "Stand-up",
    },
    {
        title: "Flamengo x Palmeiras - Brasileirão",
        description:
            "O clássico do futebol brasileiro no Maracanã. Dois dos maiores times do país se enfrentam em partida decisiva pela rodada do Campeonato Brasileiro Série A.",
        date: new Date("2025-06-08T16:00:00"),
        location: "Estádio Maracanã, Rio de Janeiro - RJ",
        price: 150.0,
        imageUrl: "https://picsum.photos/seed/futebol/800/400",
        capacity: 78000,
        availableTickets: 12000,
        category: "Esporte",
    },
    {
        title: "Cirque du Soleil - Amaluna",
        description:
            "O espetáculo Amaluna do Cirque du Soleil chega ao Brasil com acrobacias impressionantes, figurinos deslumbrantes e uma trilha sonora original que transporta o público para um mundo mágico.",
        date: new Date("2025-07-15T20:00:00"),
        location: "Parque Villa-Lobos, São Paulo - SP",
        price: 350.0,
        imageUrl: "https://picsum.photos/seed/cirque/800/400",
        capacity: 2500,
        availableTickets: 890,
        category: "Show",
    },
    {
        title: "Festival de Jazz de São Paulo",
        description:
            "Quatro dias dedicados ao jazz com artistas brasileiros e internacionais. Shows ao ar livre, workshops de improvisação e jam sessions que vão até a madrugada.",
        date: new Date("2025-08-22T18:00:00"),
        location: "Parque Ibirapuera, São Paulo - SP",
        price: 120.0,
        imageUrl: "https://picsum.photos/seed/jazz/800/400",
        capacity: 5000,
        availableTickets: 3200,
        category: "Festival",
    },
    {
        title: "O Fantasma da Ópera",
        description:
            "O musical mais famoso do mundo em nova temporada brasileira. Produção fiel ao espetáculo da Broadway com elenco nacional de alto nível e cenografia grandiosa.",
        date: new Date("2025-05-10T20:00:00"),
        location: "Teatro Renault, São Paulo - SP",
        price: 280.0,
        imageUrl: "https://picsum.photos/seed/opera/800/400",
        capacity: 1500,
        availableTickets: 420,
        category: "Teatro",
    },
];

async function seed() {
    await dataSource.initialize();
    const repo = dataSource.getRepository(Event);
    await dataSource.query("TRUNCATE TABLE orders, events RESTART IDENTITY CASCADE");
    await repo.save(events);
    console.log(`Seeded ${events.length} events`);
    await dataSource.destroy();
}

seed().catch(console.error);
