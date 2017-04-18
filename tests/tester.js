export function assert(bool, string) {
	if (!bool) {
		console.error("-- TEST FAILED: -- " + string);
	} else {
        console.log("TEST PASSED: " + string);
    }
}
