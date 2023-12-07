import * as fs from 'fs';

const INPUT = fs.readFileSync('input.txt').toString();

type Category = {
    from: string,
    to: string,
    destination: number,
    source: number
}

const base = INPUT
    .trim()
    .split("\n\n");

const categories = ['seed', 'soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity', 'location'];

let seeds = base.shift()?.split(' ').filter(Number).map(Number);

const parse = (block: string): void => {
    const [maps, ...ranges] = block.split("\n");

    const [from, to] = maps.split(/-to-|\s/).slice(0, 2);

    let locations: any = [];

    ranges.forEach(range => {
        let values = seeds?.map(seed => {
            const [destination, source, length] = range.split(' ').map(Number);

            if (source <= seed && seed < (source + length))
                return destination + (seed - source);

            return seed;
        });

        seeds = values;

        // locations.push({ to, values });

        console.log(locations);
    });

    console.log(locations);
}

base.map(parse);
