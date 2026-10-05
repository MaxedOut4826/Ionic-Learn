/**
 * This is for external use rather than use within the MCPE Script API.
 *
 * In Script API, you should use the Vector2 type provided by "@minecraft/server".
 */
export interface Vector2 {
    x: number;
    y: number;
};

/**
 * Used to perform calculations & operations on 2 dimensional points.
 */
export class Vector2Utils {
    /**
     * Returns the sum of the two vectors.
     */
    public static add(vector1: Vector2, vector2: Vector2): Vector2 {
        const { x: x0, y: y0 } = vector1;
        const { x: x1, y: y1 } = vector2;

        return {
            x: x0 + x1,
            y: y0 + y1,
        };
    }

    /**
     * Returns the difference between the two vectors.
     */
    public static subtract(vector1: Vector2, vector2: Vector2): Vector2 {
        const { x: x0, y: y0 } = vector1;
        const { x: x1, y: y1 } = vector2;

        return {
            x: x0 - x1,
            y: y0 - y1,
        };
    }

    /**
     * Returns a vector where each axis has been multipled by the scalar.
     */
    public static multiply(vector: Vector2, scalar: number): Vector2 {
        const { x, y } = vector;

        return {
            x: x * scalar,
            y: y * scalar,
        };
    }

    /**
     * Returns a vector where each axis has been divided by the scalar.
     */
    public static divide(vector: Vector2, scalar: number): Vector2 {
        const { x: x0, y: y0 } = vector;

        return {
            x: x0 / scalar,
            y: y0 / scalar,
        };
    }

    /**
     * Returns the total area of a vector calculated as x * y.
     */
    public static areaOf(vector: Vector2): number {
        const { x, y } = vector;

        return x * y;
    }

    /**
     * Returns the distance squared between two vectors.
     *
     * This can be used in substitute to the 'distance' method for performance, as it avoids the square-root call.
     */
    public static distanceBetweenSqr(vector1: Vector2, vector2: Vector2): number {
        const { x: x0, y: y0 } = vector1;
        const { x: x1, y: y1 } = vector2;

        const dx = x0 - x1;
        const dy = y0 - y1;

        return dx * dx + dy * dy;
    }

    /**
     * Returns the distance between two vectors.
     */
    public static distanceBetween(vector1: Vector2, vector2: Vector2): number {
        const { x: x0, y: y0 } = vector1;
        const { x: x1, y: y1 } = vector2;

        const dx = x0 - x1;
        const dy = y0 - y1;

        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Returns the point between two vectors at the iteration parameter 't'.
     */
    public static lerp(vector1: Vector2, vector2: Vector2, t: number): Vector2 {
        const { x: x0, y: y0 } = vector1;
        const { x: x1, y: y1 } = vector2;

        const dx = x1 - x0;
        const dy = y1 - y0;

        return {
            x: dx * t + x0,
            y: dy * t + y0,
        };
    }

    /**
     * Returns the lowest of two vectors.
     */
    public static getLowestVector(vector1: Vector2, vector2: Vector2): Vector2 {
        const { x: x0, y: y0 } = vector1;
        const { x: x1, y: y1 } = vector2;

        return {
            x: Math.min(x0, x1),
            y: Math.min(y0, y1),
        };
    }

    /**
     * Returns the highest of two vectors.
     */
    public static getHighestVector(vector1: Vector2, vector2: Vector2): Vector2 {
        const { x: x0, y: y0 } = vector1;
        const { x: x1, y: y1 } = vector2;

        return {
            x: Math.max(x0, x1),
            y: Math.max(y0, y1),
        };
    }

    /**
     * Returns the vector converted to a string.
     *
     * Example: '1, 2'.
     */
    public static toString(vector: Vector2): string {
        const { x, y } = vector;

        return `${x}, ${y}`;
    }

    /**
     * Returns the vector truncated to the nearest value at the provided point of precision.
     */
    public static toFixed(vector: Vector2, precision: number): Vector2 {
        const { x, y } = vector;

        return {
            x: parseFloat(x.toFixed(precision)),
            y: parseFloat(y.toFixed(precision)),
        };
    }

    /**
     * Returns the vector where all axes have their fractional points removed, converting them to integers.
     */
    public static truncate(vector: Vector2): Vector2 {
        const { x, y } = vector;

        return {
            x: Math.trunc(x),
            y: Math.trunc(y),
        };
    }

    /**
     * Returns the vector where all axes values have been rounded to the nearest integer.
     */
    public static round(vector: Vector2): Vector2 {
        const { x, y } = vector;
        return {
            x: Math.round(x),
            y: Math.round(y),
        };
    }

    /**
     * Returns the vector where all axes values have been rounded down to the nearest integer.
     */
    public static floor(vector: Vector2): Vector2 {
        const { x, y } = vector;
        return {
            x: Math.floor(x),
            y: Math.floor(y),
        };
    }

    /**
     * Returns the vector where all axes values have been rounded up to the nearest integer.
     */
    public static ceil(vector: Vector2): Vector2 {
        const { x, y } = vector;
        return {
            x: Math.ceil(x),
            y: Math.ceil(y),
        };
    }

    /**
     * Returns the perpindicular dot product of the two vectors; the magnitude of the 2D cross product.
     *
     * This is the relative orientation (clockwise or counter-clockwise) and the signed area of the parallelogram formed by the two vectors
     */
    public static perpDotProduct(vector1: Vector2, vector2: Vector2): number {
        const { x: x0, y: y0 } = vector1;
        const { x: x1, y: y1 } = vector2;

        return x0 * y1 - y0 * x1;
    }

    /**
     * Returns the dot product of the two vectors; a scalar indicating how much two vectors face in the same direction.
     */
    public static dotProduct(vector1: Vector2, vector2: Vector2): number {
        const { x: x0, y: y0 } = vector1;
        const { x: x1, y: y1 } = vector2;

        return x0 * x1 + y0 * y1;
    }

    /**
     * Returns a vector where each axis of vector1 has been multiplied by its vector2 counterpart.
     */
    public static hadamardProduct(vector1: Vector2, vector2: Vector2): Vector2 {
        const { x: x0, y: y0 } = vector1;
        const { x: x1, y: y1 } = vector2;

        return {
            x: x0 * x1,
            y: y0 * y1,
        };
    }

    /**
     * Returns the vector normalised to be have a length of exactly one while preserving direction.
     */
    public static normalise(vector: Vector2): Vector2 {
        const { x: x, y: y } = vector;
        const magnitude = Math.sqrt(x * x + y * y);

        return {
            x: x / magnitude,
            y: y / magnitude,
        };
    }

    /**
     * Returns the point between p0 & p2 using p1 as the control for the arch of the bezier curve.
     */
    public static bezier(p0: Vector2, p1: Vector2, p2: Vector2, t: number): Vector2 {
        const { x: x0, y: y0 } = p0;
        const { x: x1, y: y1 } = p1;
        const { x: x2, y: y2 } = p2;

        const intermediateX0 = (x1 - x0) * t + x0;
        const intermediateY0 = (y1 - y0) * t + y0;

        const intermediateX1 = (x2 - x1) * t + x1;
        const intermediateY1 = (y2 - y1) * t + y1;

        return {
            x: (intermediateX1 - intermediateX0) * t + intermediateX0,
            y: (intermediateY1 - intermediateY0) * t + intermediateY0,
        };
    }

    /**
     * Returns a new vector in front of the position based on the rotation & distance.
     */
    public static getPositionInFront(
        position: Vector2,
        rotation: Vector2,
        distance: number,
    ): Vector2 {
        const { x: rotX, y: rotY } = rotation;
        const { x: posX, y: posY } = position;

        const viewDirectionX = rotX * distance;
        const viewDirectionY = rotY * distance;

        return {
            x: posX * viewDirectionX,
            y: posY * viewDirectionY,
        };
    }
}
