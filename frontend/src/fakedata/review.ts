import { GameReview } from "@/types/review";

type StoredGameReview = {
    user: string,
    game: string,
    text: string,
    rating: number,
};

export const fakedata_getGameReview = async (game: string, user: string): Promise<GameReview> => {
    const result = await fetch("http://localhost:3000/reviews.json", {cache: "no-store"});
    const reviews = (await result.json()) as StoredGameReview[]; 

    const review: GameReview = reviews.length > 0 ? reviews.filter(review => review.user === user && review.game === game)[0] : {
        text: "",
        rating: 0
    };

    return review;
}

export const fakedata_setGameReviewText = async (game: string, user: string, text: string) => {
    const result = await fetch("http://localhost:3000/reviews.json", {cache: "no-store"});
    const reviews = (await result.json()) as StoredGameReview[]; 

    let done = false;
    reviews.forEach(review => {
        if(review.user === user && review.game === game) {
            review.text = text
            done = true;
        }
    });

    if(!done) {
        reviews.push({
            user: user,
            game: game,
            text: text,
            rating: 0
        })
    }

    console.log(reviews);
}

export const fakedata_setGameReviewRating = async (game: string, user: string, rating: number) => {
    const result = await fetch("http://localhost:3000/reviews.json", {cache: "no-store"});
    const reviews = (await result.json()) as StoredGameReview[]; 

    let done = false;
    reviews.forEach(review => {
        if(review.user === user && review.game === game) {
            review.rating = rating;
            done = true;
        }
    });

    if(!done) {
        reviews.push({
            user: user,
            game: game,
            text: "",
            rating: rating
        })
    }

    console.log(reviews);
}
