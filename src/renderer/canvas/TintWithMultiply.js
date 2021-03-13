/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Tint with multiply.
 *
 * @function GetTintedCanvas
 * @since 3.53.0
 * @private
 *
 * @param {Phaser.GameObjects.GameObject} sprite - The texture based Game Object to tint.
 * @param {Phaser.Textures.Frame} frame - The frame.
 * @param {number} color -The color to tint the sprite with.
 * @param {HTMLCanvasElement} canvas - The current canvas.
 */
var TintWithMultiply = function (sprite, frame, color, canvas)
{
    var context = canvas.getContext('2d');
    var cd = frame.canvasData;

    var stringColor = '#' + ('00000' + (color | 0).toString(16)).substr(-6);

    var res = frame.source.resolution;

    var frameX = cd.x;
    var frameY = cd.y;
    var frameWidth = frame.cutWidth;
    var frameHeight = frame.cutHeight;

    canvas.width = frameWidth;
    canvas.height = frameHeight;

    context.save();
    context.fillStyle = stringColor;

    context.fillRect(0, 0, frameWidth, frameHeight);

    context.globalCompositeOperation = 'multiply';

    context.drawImage(frame.source.image, frameX, frameY, frameWidth, frameHeight, 0, 0, frameWidth / res, frameHeight / res);

    context.globalCompositeOperation = 'destination-atop';

    context.drawImage(frame.source.image, frameX, frameY, frameWidth, frameHeight, 0, 0, frameWidth / res, frameHeight / res);
    context.restore();
};

module.exports = TintWithMultiply;
