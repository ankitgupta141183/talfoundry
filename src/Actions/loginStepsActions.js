export function firstLoginStep(value) {
    return {
        type: "LOGIN_STEP_1",
        payload: value
    }
}

export function secondLoginStep(value) {
    return {
        type: "LOGIN_STEP_2",
        payload: value
    }
}



export function freeLancerSideBar(active) {
    return {
        type: "ACTIVE_SIDERBAR_FREELANCER",
        payload: active
    }
}

export function showHideSideBar(active) {
    return {
        type: "SIDERBAR_SHOW_HIDE",
        payload: active
    }
}

