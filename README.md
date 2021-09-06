# Camera pose estimation evaluator - assigment tasks.

## Initial assumptions:

1. The object will be rendered on a black background, it's assumed we have already isolated the object.
2. The camera is always pointing at the object, this leaves it's spatial position to be calculated.
3. Breaking this down further, we can focus on the camera's 3D position in relation to the object, and this can be split into rotation, elevation and distance.

### Initial approach:

1. If we can find the relative angle of the camera (rotation and elevation), the distance should be comparitively trivial to calculate, though this might be less than trivial if perspective distortion is taken into account, esp at short distances.
2. With that in mind, we should begin by solving the problem for an Orthographic camera. It's a fixed, consistent view, and while no real life cameras are Orthographic, they all tend towards the Orthographic view as the distance increases. This gives us a very robust starting point that, at distance, will be consistent for all cameras.
3. Leaving us to solve for perspective distortion at close distances as a special case, despite the real life problem being the reverse (perspective distorion being the norm, long distance Orthographic view being the special case.)
4. This will force us to tend towards metrics that are distance agnostic, like colour, aspect ratio and shape.
5. If we calculate aspect ratio first, this will give us a very quick, very rough picture of likely camera positions.
6. Shape should be normalised to a square area, we've already calclated aspect ratio, and it would help to be able to consider this metric separately from the object's shape. It may also help mitigate moderate levels of perspective distortion. This gives us a second, more accurate picture of likely camera positions.
7. Colour should be used as a final metric to discriminate where A.R. and Shape aren't enough. It can be an incredibly accurate metric; But is also subject to, and more sensitive to, race conditions, making it less suitable as a starting metric.
8. The user should be presented with a three-phase map of likely positions, according to A.R, Shape and Colour match, and if processing time is a noticable factor, these can be presented individually, in order.
9. The user will be able to select a preferred resolution, eg. 5 levels of rotation and elevation, giving 25 test positions, or 10x10, 100x100, again these can be queried in order and with consideration to processing time - a higher resolution will yield a more accurate answer but will cost more in terms of processing time. This point also highlights the need to query the distance separately.
10. The above process can be automated, and using each progressive metric to eliminate areas, and focus on likely areas with a higher resolution, giving us a 1000x1000 precision without having to check every one of a million possible positions.
11. It's important to allow the user to delegate or take over this process at each point, at their discretion.
12. My first attempt at visualising these three metrics combined will be to assign each one to the red, green and blue channels, respectively, giving us an overlaid combination that will be both aesthetically pleasing, but with a meaningful colour space, tending towards white for the most accurate comparison areas.

# The build, piece by piece.

## index.htm

## index.js
Root js file, loaded as a module, allowing dynamic modules to be loaded within it.

## bunny.glb
For the sake of space and simplicity - geometry and texture packed into a single gltf binary file.

## sampleImageOrth1.png, sampleImageOrth2.png, sampleImageOrth3.png
Sample images taken from an Orthographic viewpoint.

## sampleImagePersp1.png, sampleImagePersp2.png, sampleImagePersp3.png
Sample images taken with various types of perpective settings.
It's important to test the breaking point of an Orthographic-only viewer.

## ImageMetrics.js
