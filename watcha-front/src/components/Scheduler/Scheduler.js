import React, { Component, useEffect, useState, useRef } from "react";
import "dhtmlx-scheduler";
import "dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css";
import { SchedulerBody } from "./Scheduler.style";
import axios from "axios";
import { backUrl } from "../../config/config";
import { useSelector, useDispatch } from "react-redux";

const scheduler = window.scheduler;

const Scheduler = ({ events }) => {
    const [data, setData] = useState([]);
    const schedulerContainer = useRef(null);

    useEffect(() => {
        scheduler.skin = "material";
        scheduler.config.header = [
            "day",
            "week",
            "month",
            "date",
            "prev",
            "today",
            "next",
        ];

        scheduler.config.hour_date = "%g:%i %A";
        scheduler.xy.scale_width = 70;

        initSchedulerEvents();
        let today = new Date();
        scheduler.init(schedulerContainer.current, new Date(today.getFullYear(),
                                                            today.getMonth(),
                                                            today.getDate()));
        scheduler.clearAll();
        scheduler.parse(events);

    },[events]);

    const initSchedulerEvents = () => {
        if (scheduler._$initialized) {
            return;
        }
        if (localStorage.getItem("token")){
            scheduler.attachEvent("onEventAdded", (id, ev) => {
                fetch(`${backUrl}/scheduler`, {
                    method: "POST",
                    body: JSON.stringify({
                        start_date: ev.start_date,
                        end_date: ev.end_date,
                        text: ev.text,
                    }),
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                }).then((res) => handleGet());
            });
        }

        scheduler.attachEvent("onEventChanged", (id, ev) => {
            fetch(`${backUrl}/scheduler`, {
                method: "PUT",
                body: JSON.stringify({
                    id: id,
                    start_date: ev.start_date,
                    end_date: ev.end_date,
                    text: ev.text,
                }),
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            })
                .then((res) => handleGet())
                .catch((error) => console.log(error));
        });

        scheduler.attachEvent("onEventDeleted", (id, ev) => {
            fetch(`${backUrl}/scheduler`, {
                method: "DELETE",
                body: JSON.stringify({
                    id: id,
                }),
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            }).then((res) => {
                    handleGet();
               })
               .catch((error) => {
                   console.log(error);
               });
        });
        scheduler._$initialized = true;
    };

    const handleGet = () => {
        axios
            .get("/scheduler")
            .then((res) => {
                setData({ data: res.data });
            })
            .catch((error) => {
                console.log("error : ", error);
            });
    };

    return <SchedulerBody ref={schedulerContainer}></SchedulerBody>;
};

export default Scheduler;
