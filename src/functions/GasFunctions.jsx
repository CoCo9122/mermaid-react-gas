export const gasRun = (gasFuncName, gasObj, successFunc, failureFunc) => {
    return new Promise((resolve, reject) => {
        google.script.run.withSuccessHandler((result) => {
            resolve(successFunc(result))
        }).withFailureHandler((...e) => {
            failureFunc()
            reject(new Error(e.message))
        })[gasFuncName](gasObj)
    });
}