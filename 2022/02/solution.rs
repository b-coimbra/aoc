const INPUT: &str = include_str!("input.txt");

#[derive(Copy, Clone)]
enum Shape {
    Rock = 1, Paper, Scissors
}

enum Outcome {
    Win, Lose, Draw
}

enum Opponent {
    A = 1, B, C
}

enum Player {
    X = 1, Y, Z
}

impl Outcome {
    fn get(&self) -> u32 {
        match *self {
            Outcome::Win  => 6,
            Outcome::Draw => 3,
            Outcome::Lose => 0
        }
    }
}

impl Player {
    fn toShape(c: &str) -> Shape {
        match c {
            "X" => Shape::Rock,
            "Y" => Shape::Paper,
            "Z" => Shape::Scissors,
            _ => panic!("Unknown option")
        }
    }

    fn toOutcome(c: &str) -> Outcome {
        match c {
            "X" => Outcome::Lose,
            "Y" => Outcome::Draw,
            "Z" => Outcome::Win,
            _ => panic!("Unknown option")
        }
    }
}

impl Opponent {
    fn toShape(c: &str) -> Shape {
        match c {
            "A" => Shape::Rock,
            "B" => Shape::Paper,
            "C" => Shape::Scissors,
            _ => panic!("Unknown option")
        }
    }
}

fn score(opponent: &Shape, player: &Outcome) -> u32 {
    let outcome = match (opponent, player) {
        (Shape::Rock,     Outcome::Lose) => Shape::Scissors,
        (Shape::Rock,     Outcome::Draw) => Shape::Rock,
        (Shape::Rock,     Outcome::Win)  => Shape::Paper,

        (Shape::Paper,    Outcome::Lose) => Shape::Rock,
        (Shape::Paper,    Outcome::Draw) => Shape::Paper,
        (Shape::Paper,    Outcome::Win)  => Shape::Scissors,

        (Shape::Scissors, Outcome::Lose) => Shape::Paper,
        (Shape::Scissors, Outcome::Draw) => Shape::Scissors,
        (Shape::Scissors, Outcome::Win)  => Shape::Rock
    };
    (outcome as u32) + player.get()
}

fn main() {
    let rounds = INPUT
        .trim()
        .lines();

    let mut total: u32 = 0;

    for round in rounds {
        let choice: Vec<&str> = round.split(" ").collect();

        let opponent = Opponent::toShape(&choice[0]);
        let player = Player::toOutcome(&choice[1]);

        total += score(&opponent, &player);
    }

    println!("Total Score: {total}");
}
