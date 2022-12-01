const INPUT: &str = include_str!("input.txt");

fn parse(value: &str) -> i32 {
    value
        .lines()
        .flat_map(|x| x.parse::<i32>())
        .sum()
}

fn main() {
    let mut chunks = INPUT
        .trim()
        .split("\n\n")
        .map(parse)
        .collect::<Vec<i32>>();

    chunks.sort();

    println!("{:?}", chunks.last());
    println!("{:?}", chunks.iter().rev().take(3).sum::<i32>());
}
