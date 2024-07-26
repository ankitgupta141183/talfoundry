export function BreadCrumbSteps(state = [{BreadCrumbName : "Home", link :"/"}], action) {
    switch (action.type) {
      case 'BREAD_CRUMB_STEPS':
        return action.steps;
  
      default:
        return state;
    }
  }