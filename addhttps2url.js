/**
 * @author Heyboi
 * @name addhttps2url
 * @origin Heyboi自用
 * @version 1.0.0
 * @description 给链接加上https
 * @rule ^[^\s/$.?#].[^\s]*\.[^\s]*$
 * @admin false
 * @disable false
 */
module.exports = async s => {
    url=addHttpsToUrl(s.getMsg());
    await s.inlineSugar(url);
    function addHttpsToUrl(str) {
        const regex = /^(http|https):\/\/(.*)$/;
        if (!regex.test(str)) {
          str = 'https://' + str;
        } else if (!str.startsWith('https://')) {
          str = str.replace('http://', 'https://');
        }
        return str;
      }
}
