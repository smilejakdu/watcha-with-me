import React, { Component } from "react";
import "dhtmlx-scheduler";
import "dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css";
import { SchedulerBody} from "./Scheduler.style"
import axios from "axios";
import {backUrl} from "../../config/config"

const scheduler = window.scheduler;

class Scheduler extends Component {
    state = {
        data: [],
    };

    initSchedulerEvents() {
        if (scheduler._$initialized) {
            return;
        }

        const onDataUpdated = this.props.onDataUpdated;

        scheduler.attachEvent("onEventAdded", (id, ev) => {
            fetch(`${backUrl}/scheduler`, {
                method: "POST",
                body: JSON.stringify({
                    start_date: ev.start_date,
                    end_date: ev.end_date,
                    text: ev.text,
                }),
                headers:{
                    'Authorization':`${localStorage.getItem("token")}`
                }
            })
            .then((res) => {
                console.log(res.json);
            })
            .then((result) => this.handleGet());
        });


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
            .then((res) => console.log(res.json))
            .then((res) => this.handleGet())
            .catch((error) => console.log(error));
        });

        scheduler.attachEvent("onEventDeleted", (id, ev) => {
            console.log("delete");
            fetch(`${backUrl}/scheduler`, {
                method: "DELETE",
                body: JSON.stringify({
                    id : id,
                }),
            })
            .then((res) => console.log(res))
            .then((result) => {
                console.log("삭제하는부분");
                this.handleGet();
            })
            .catch((error) => {
                console.log(error);
            });
        });
        scheduler._$initialized = true;
    }

    handleGet = () => {
        fetch(`${backUrl}/scheduler`, {
            method: "GET",
        })
        .then((res) => res.json())
        .then((result) => {
            this.setState({
                data: result.data,
            });
        })
        .catch((error) => console.log("error", error));
    };

    componentDidMount() {
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

        this.initSchedulerEvents();

        const { events } = this.props;
        scheduler.init(this.schedulerContainer, new Date(2021, 5, 10));
        scheduler.clearAll();
        scheduler.parse(events);
    }

    render() {
        const {events} = this.props;
        scheduler.parse(events);
        return (
            <SchedulerBody
                ref={(input) => {
                    this.schedulerContainer = input;
                }}
            ></SchedulerBody>
        );
    }
}

export default Scheduler;