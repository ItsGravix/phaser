/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var TintWithMultiply = require('./TintWithMultiply');

/**
 * Get tinted canvas.
 *
 * @function GetTintedCanvas
 * @since 3.53.0
 * @private
 *
 * @param {Phaser.GameObjects.GameObject} sprite - The texture based Game Object to tint.
 * @param {Phaser.Textures.Frame} frame - The frame.
 * @param {number} color -The color to tint the sprite with.
 *
 * @return {HTMLCanvasElement} The current tinted canvas.
 */
var GetTintedCanvas = function (sprite, frame, color)
{
    var texture = frame.texture;
    var stringColor = '#' + ('00000' + (color | 0).toString(16)).substr(-6);

    texture.tintCache = texture.tintCache || {};

    var cachedCanvas = texture.tintCache[stringColor];
    var canvas;

    if (cachedCanvas)
    {
        // todo: texture frame change support?

        canvas = texture.tintCache[stringColor];
    }
    else
    {
        console.log('created tint canvas');
        canvas = document.createElement('canvas');
    }

    TintWithMultiply(sprite, frame, color, canvas);

    // todo: canvas tintId for frame updates

    texture.tintCache[stringColor] = canvas;

    return canvas;
};

module.exports = GetTintedCanvas;
