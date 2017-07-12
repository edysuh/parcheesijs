// module.exports = function(chai, utils) {
// 	var Assertion = chai.Assertion;
	
// 	Assertion.overwriteMethod('equals', function(_super) {
// 		return function assertEquality(space) {
// 			if (utils.flag(this, 'space.equals')) {
// 				var obj = this._obj;

// 				new Assertion(obj).instanceof(Space);
// 				new Assertion(obj).to.have.deep.property('_attrs.equals');


// 				this.assert(
// 				obj.equals(space),
// 					"expected #{this} to equal #{#exp} but got #{act}",
// 					"expected #{this} to not equal #{#exp} but got #{act}",
// 					obj,
// 					space
// 				);
// 			} else {
// 				_super.apply(this, arguments);
// 			}
// 		};
// 	});
// };
