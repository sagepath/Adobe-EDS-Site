import { getBlockJSON } from "../../scripts/utilities.js";

export default function decorate(block) { 
    const blockJSON = getBlockJSON();
}

function createPushpin(user, target) {
    var $user = $(user);
    var $target = $(target);
    $user.pushpin({
      top: $target.offset().top,
      bottom: $target.offset().top + $target.outerHeight() - $user.height()
    });
}

export {
    createPushpin
}