/**
 * 시간 표현식 함수입니다.
 */

export function formatDate(dateString) {
    const date = new Date(dateString);
    const currentDate = new Date();

    // 작성일이 오늘인지 확인
    const isToday =
        date.getDate() === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear();

    if (isToday) {
        // 작성일이 오늘이면 시간만 표시
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
        // 작성일이 과거이면 년월일 표시
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString([], options);
    }
}
