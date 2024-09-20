"use client"

import { getGameReview, setGameReviewRating, setGameReviewText } from "@/api/api";
import { Game } from "@/types/games";
import { GameReview } from "@/types/review";
import { User } from "@/types/user";
import { useEffect, useState } from "react";

export const GameReviewComponent = ({user, game}: {user: User, game: Game}) => {
    const [oldReview, setOldReview] = useState<null|GameReview>(null);
    const [review, setReview] = useState<null|GameReview>(null);

    useEffect(() => {
        getGameReview(user.username, game.identifier).then(res => {
            if(res.success) {
                setReview(res.value);
                setOldReview(res.value);
            }
        })
    }, [setReview, setOldReview])

    if(!review) return <></>

    return <>
        <select value={"" + review.rating} onChange={(e) => {
            const newReview = structuredClone(review);
            newReview.rating = parseInt(e.target.value);

            setGameReviewRating(user.username, game.identifier, newReview.rating).then(r => {
                if(!r.success) {
                    setReview(structuredClone(oldReview));
                } else {
                    setReview(newReview);
                    setOldReview(newReview);
                }
            })
        }}>
            <option value={"0"}>No Rating</option>
            <option value={"1"}>1 Star</option>
            <option value={"2"}>2 Star</option>
            <option value={"3"}>3 Star</option>
            <option value={"4"}>4 Star</option>
            <option value={"5"}>5 Star</option>
        </select>
        <textarea key={"a"} value={review.text} onChange={(e) => {
            const newReview = structuredClone(review);
            newReview.text = e.target.value;
            setReview(newReview);
        }} onBlurCapture={(e) => {
            const newReview = structuredClone(review);
            newReview.text = e.target.value;

            setGameReviewText(user.username, game.identifier, newReview.text).then(r => {
                if(!r.success) {
                    setReview(structuredClone(oldReview));
                } else {
                    setReview(newReview);
                    setOldReview(newReview);
                }
            })
        }}/>
    </>
}
