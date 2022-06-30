import { ElNotification } from "element-plus";

//消息提示
export function toast(message, type = "success", danggerouslyuseHTMLString = false) {
    ElNotification({
        duration: 1500,
        danggerouslyuseHTMLString,
        message,
        type,

        // duration: 1500,
        // message: "登陆成功",
        // type: "cuccess",
    });
}