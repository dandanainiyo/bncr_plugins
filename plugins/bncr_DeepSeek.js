/**
 * @author Heyboi
 * @name bncr_DeepSeek
 * @team Heyboi自用
 * @version 1.0.0
 * @description DeepSeek
 * @rule ^ai ([\s\S]+)$
 * @admin false
 * @public true
 * @public true
 * @disable false
 * @classification ["Server"]
 * 
 *  * 说明：
    1、 对接国产第一梯队的deepseek v3，发送'ai （对话内容）'使用；
    2、 所有用户可用,可以分用户记忆对话；
    3、 建议一次任务完成后发送'ai 清空上下文'或者'ai 清空对话'，以减小服务器压力和节约对话次数；
    4、 使用前先去插件配置
 * 
 */

 /** Code Encryption Block[be188605b2af9d5e9f0e7db22a9634fc371b397d02bd0850c5c0c2298f94e73fe9972c3b1fb9668124ee0500144f9711f945ee921ccca33a7615a8597474e9ebbb62f36beaccd3b36696713f70d8f26629b01842de408532a37efdf7a7d5709a6175e265dad8ca23d2d75580d14714e7e4355fc641bba82739c2e374e2556cb2cd87fbf0ba0d22565f16a3de1037e38fc85ac18b8bf39ceb15680b66845c792f93d0de0708450bf4bb2bb5d59c86fc20fe4969be172da83798fb72091b865755ddae8974966aeda1751c0fa15c1c4a6624e0496eea9f9d9a64874d0cc1f6fe9462a2b41eb599b1be4c18356f807d9a4e8173530846bf93855444fdf593153d4dc1be6aba36f77b7d596fd293cfdf6a3de45020c4a4f46c440429a8d88c55bf20b80463f589b17839ff230a95f558eb5a013b229eddd855704e76734f7202d62cad6863071f7bfe37b62ec62f97426b26dd059c38c3a499e454b5b382a533776f0a6b7cd0d5230d785c7269b9efe2c7caaac6b377dd1f5d13fb3332dcd2cfc4eb3bb57eb4910b5916cd410224e41708029a0a6bf6c1e599196b9124e5a76c7657235a765e707c7e52c16b72407aa951781a61babb6adb9f0cd2c4bf57ed9ba2e1a92e51a2379013a191dd90078783d07f91ed06f71971a8c937a4acfb93b7795379770f256f97029086a2c76bb2bd894fb93c1c94476bbafd5e41f2e201074da75840d3f11366e60099c4df15c4f2d9945d07ff5682b45088d0ee4dbde8fbfc6609bc8e2b63715a2678f77fb3595d5ff5004e28dd98d5229431dccea93daeb5f17b651ed0f96ac244581530b4afdc7963f4a7f2769bef5222d0d2b03100230818a861020d864c02c98cb05e89557d35619d7856b47500259698b73f8cd59f5fcf26191a513016a37b86b560756c60f83437200deab3584956696881021a4018d55db00b868bf2121b7f19db15afa801b63b81555dabb6d056bd5b1196a6413c50fc1c1e34c7f89baedd00225aca33f0664d40f6b5a9f24b09b0dc7bf0127927e8e722f23f199e5cfc614f6ddbddc02a412361bb0fae067b25b9c11d46d5e845272a82752ac3be137e304741f27b15c62cebd7621ef43e10cc4e47895bd939965d1b1d19ad08a89ce7e3f3518946ba11b2105ec72e49741ba940a68a6d7f1f5f680d52a962cec7770703858aadb6c742a94e47e16c0d34eec2cc55a791a3176880c0d44b756114de3121186e97fcb188cf7638d3ab8986d6c04c517eabf0b898b3db5923cdf46834fc0802845c190a5912d87d5071b1a5fdfbc7947b6f5f3e3e9175779f36e82a3bfef5ae30985b5cb52fade4a5ebdd034bedce0ce92b49e374d41ed1cd6a2e9114d66610b27a7fa2f3cf88cef928589006135a298bcd476cdc4e8d61c51ad97245357bf45bcb4857ba2bebcd3ef747d0feaee21fb61695e22e461fadb2c1887709301e9c525efbb2c630e452f8148999104302cef2be2a09bb981d7271ed1fe3671c0f9b484ae8c067e1eac7251e0576e1eb3268abf28f6406b5941dd4a43ec062b62c01075e6cb4d6ea8723d2a6cc4ce8e3c1a6fa9a3a1a12a0ddeee473c001d801f47cc98272e40c50af7dcd7986fb58405d73e36fb42830bf2a4e079c670601c33734b610490a79de7d1d0108efd5ca5ea2bb9e85f0a0cf976cf4102c9411c11a1d5aee07a0153f5cd38fdf313211cad5d7df4aabc93389c00996dee9cc94d1c969d693341b3bc4024515b38007e9ee419aee8a151780acb9c29972adc5b51426f7a470343e2d95a78939ea837e442c5ab35b7c4a5ce95b0dadb4216a05052a1ca3f9b8912f5aa83274fe03dbe7d4d0f918ea770025dee18a39afa9e84378263b7fc8214e56fb3949a789dc0cba9e72d6573d558f4cc3e53818b4085c8e30d2992f6e5c53c2334ca53bea88ad7899de6db9c0dee3ba5ac3e6547d2fafa9088fad09046dc29a94292d7b4c543067885b89b5ca1883ad7b3aacb210a8faba52705b6e990fa60eee14cc0e6b10837cc60a1550ff4b4b50f652749e61da9d1d3ec7aee88634087d45ea42e5d430c8e3cb42d043354dea0ab19ae3f785b8976b3a4714e5948435f48f148ff41020bcf5195d850b94fbf207fd8ad92eac47689951d33ed990256ebbd0c169b706988ebeeb93dc63905f8056dffb9a7f949d6d2ab497287c671c49eacc7fd31a3f7701baa9ff1bfbdee3de43563effea4f2b908204bcbfdacdd31c03f28d9a22dd97ebf7ac6f7b8e2119b6932522b27780be8cd2c3fed6840d99b6afa186c5fa788a8872ac50e8e0602c879da8bb6ec5b802119e80e165f03a227331d655c6074b9960ecad8223429b7d009b444d079004311777ba6bc9c4fc0bfa8fc659729297e50d5c2e6937fdfddc3ed583c621a9cd6d7a5897d3af859d8723f705203288a91f9c440ba3ab35c340a64ceaab23552b39036293cfe0a5f1bc9461b68744b2d530175cc234fa8ecc58bebb3393bad030aa3ca059264a203e7e8f590b9601ee9e88ebe3efd75215ce4476ba24222d07d8ef8da37f30e0910fce746e8797c392399f91c1e9a9cf099f6225a391a937e8641996c33e48c6ba0ec54ca05afd8645eb39bd2351fc989b45e4e4e91c3c32585f05975c89ec8c12882b2c876ffd441167e4f1951922a01be023274e8e8654fd219ce5fa2b10b75b8d98e30f7fa58e144bf4694449a4717256aae0e195c53d00b0b84607f11bba61d7bd85318faa9eedca642e5426d5860b951aa6ff5c1f75d968c7840b93a1e39c4ea27e7ca6a0a43f6268058713114260369a297c7304df75abeafc1a00e4739af0cc7c93fca50db21aa8da0e781eabd91b6d772fc5eb9afbb0a662fed57b1a3d8b57acabd22dfe053b796866bf3d56574a6bbe4f1cbac1036a56f961bcf7a1ebb9301427d3ae5c840ed8376dd4340c8a9cdbdd6d960f039e9edf656788bbb1f51c5e61bd2e8647c07b65e258adfd497a419f0a96d95b2b7296704fa0d0e5d4003d219d1b4ca649648e44f2acc04f8e9829c099c21659a0884c662c683369b749f2ecf5136220ff3f1d9203a32d33a8991847014242227ebb705fe88a47867e66bdf829abfcf52cfd16e861eb7b1ea6e3dc5ad7e95d1adeb64bb62ce5bbb7d39b418c73b7c4dc2feb0b6411e90690714628a97ba9b44a1bd12b2a05915b15e842113901b8cd4ccf5d95f21ffc2fdb69d24eb06fd9f372fa40a6b89059081b39c9f9b1fd4fef991b7f35b5a5e37f08583933df4802629d97d7ea20fc50d3a48790e5ca8d4f916c98] */
