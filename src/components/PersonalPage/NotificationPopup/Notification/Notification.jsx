import { calcHours } from "./utils";
import { useEffect, useState } from "react";
export const Notification = ({ notificationDate, message, user }) => {


    const hourse = calcHours(notificationDate)

    const { name, photoURL } = user



    return (
        <div>
            <img src={photoURL} alt="photo" />
            <div>
                <span>
                    {message}
                </span>
                <span>
                    {hourse} h ago
                </span>
            </div>
        </div>
    )
}