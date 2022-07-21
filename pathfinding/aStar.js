class Node {

    /** Node structure used in a* algorithm
     * 
     *  @param {Number} indexX \<int> X index within grid
     *  @param {Number} indexY \<int> Y index within grid
     *  @param {Boolean} isWall \<bool> If node is blocked (Default false)
     *  
     *  @author Jakob
     * 
     */

    constructor (indexX, indexY, isWall = false) {

        this.index = { // Index of node within grid

            x: indexX,
            y: indexY
        
        }
    
        this.f = 0, this.g = 0, this.h = 0; // f-cost, g-cost and h-cost of node
    
        this.cost = 1; // Cost to move to node (in cardinal direction)
        this.isVisited = false; // Has node been traversed
        this.isClosed = false; // Is node fully traversed
        this.isWall = isWall; // Is node a wall (cannot be traversed)
    
        this.parent; // Previous node in path

    }

}

class aStar {

    /** Returns array of neighbour nodes
     * 
     *  @param {Array} grid \<2dArray> Grid of nodes being traversed
     *  @param {Node} node \<Node> Node being inspected
     *  @param {Boolean} searchDiagonal \<bool> If diagonals are being searched
     * 
     *  @returns {Array} neighbours \<array> Array of neighbour nodes
     *  
     *  @author Jakob 
     * 
     */

    static neighbours = function (grid, node, searchDiagonal) {

        let neighbours = [];
    
        for (let indexY = -1; indexY <= 1; indexY ++) {
    
            for (let indexX = -1; indexX <= 1; indexX ++) {
    
                let newIndexY = node.index.y + indexY;
                let newIndexX = node.index.x + indexX;
        
                let isDiagonal = !(indexY == 0 || indexX == 0); // Node is in a diagonal direction
        
                if (indexY == 0 && indexX == 0) continue; // Skip current node
        
                if (newIndexY < 0 || newIndexY >= grid.length) continue; // Skip if out of bounds
        
                if (newIndexX < 0 || newIndexX >= grid[newIndexY].length) continue; // Skip if out of bounds
        
                if (!searchDiagonal && isDiagonal) continue; // Skip if not using diagonals
        
                let neighbour = grid[newIndexY][newIndexX];
        
                if (neighbour.isClosed || neighbour.isWall) continue; // Skip if neighbour not valid
        
                if (isDiagonal) neighbour.cost = 1.4;
                
                neighbours.push(neighbour);
            
            }
          
        }
    
        return neighbours;
        
    }

    /** Returns the manhattan distance between 2 locations
     * 
     *  @param {Object} current \<Vector> Location 1 {x, y}
     *  @param {Object} target \<Vector> Location 2 {x, y}
     * 
     *  @returns {Number} dX + dY \<int> Distance between 2 locations
     * 
     *  @author Jakob
     * 
     */

    static manhattan = function (current, target) {

        let dX = Math.abs(current.x - target.x);
        let dY = Math.abs(current.y - target.y);
    
        return dX + dY;
        
    }

    /** Returns the euclidean distance between 2 locations
     * 
     *  @param {Object} current \<Vector> Location 1 {x, y}
     *  @param {Object} target \<Vector> Location 2 {x, y}
     * 
     *  @returns {Number} Math.sqrt(dX^2 + dY^2) \<float> Distance between 2 locations
     * 
     *  @author Jakob
     * 
     */
    
    static euclidean = function (current, target) {
    
        let dX = current.x - target.x;
        let dY = current.y - target.y;
    
        return Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
        
    }

    /** Path finding algorithm handler
     * 
     *  @param {Number} gridSizeX \<int> X size of 2d grid
     *  @param {Number} gridSizeY \<int> Y size of 2d grid
     *  @param {Boolean} searchDiagonal \<bool> If diagonals are being searched (Default false)
     *  @param {Function} heuristic \<func> Function for calculating the heuristic distance between 2 locations (Default manhattan distance)
     * 
     *  @author Jakob
     * 
     */

    constructor (gridSizeX, gridSizeY, searchDiagonal = false, heuristic = aStar.manhattan) {

        this.grid = new Array (gridSizeY); // 2d Array of nodes

        for (let indexY = 0; indexY < gridSizeY; indexY ++) {
      
            this.grid[indexY] = new Array (gridSizeX);

            for (let indexX = 0; indexX < gridSizeX; indexX ++) { // Populate array with nodes

                this.grid[indexY][indexX] = new Node (indexX, indexY);
                
            }

        }

        this.openHeap = new BinaryHeap (function (node) { // Create a new heap sorted by f-cost

            return node.f;
            
        });

        this.searchDiagonal = searchDiagonal; // If diagonals can be traversed

        this.heuristic = heuristic; // Heuristic calculation function

    }

    /** Traverses grid to find optimal path from the start node to the end node
     * 
     *  @param {Node} startNode \<Node> Initial location
     * 
     *  @returns {Array} path \<array> Array of nodes (In order) for the quickest path from start to end
     * 
     *  @author Brian Grindstead - https://briangrinstead.com/blog/astar-search-algorithm-in-javascript/
     * 
     */

    search (startNode, endNode) {

        this.openHeap.push(startNode);

        while (this.openHeap.size() > 0) {
            
            let currentNode = this.openHeap.pop(); // Take node from front of heap
            
            if (currentNode.index.x == endNode.index.x && currentNode.index.y == endNode.index.y) { // If end has been found
        
                let pathNode = currentNode;
                let path = []; // Create array of path nodes in order
            
                do {
            
                    path.push(pathNode);
                    pathNode = pathNode.parent;
                    
                } while (pathNode);
            
                return path.reverse();
                
            }
        
            // Close current node and process each of its neighbours
        
            currentNode.isClosed = true;
        
            // Find all neighbours of current node
        
            let neighbours = aStar.neighbours(this.grid, currentNode, this.searchDiagonal);
        
            for (let neighbour of neighbours) {
        
                let gScore = currentNode.g + neighbour.cost;
                let beenVisited = neighbour.isVisited;
            
                if (!beenVisited || gScore < neighbour.g) {
            
                    // Found new optimal path to node, update costs
            
                    neighbour.isVisited = true;
                    neighbour.parent = currentNode;
            
                    neighbour.h = neighbour.h || this.heuristic(neighbour.index, endNode.index);
                    neighbour.g = gScore;
                    neighbour.f = neighbour.h + neighbour.g;
            
                    if (!beenVisited) { // Insert neighbour into heap
            
                        this.openHeap.push(neighbour);
                        
                    } else {
            
                        this.openHeap.rescoreElement(neighbour);
                    
                    }
                    
                }
            
            }

        }

        console.log(`No path between [${startNode.index.x}, ${startNode.index.y}] and [${endNode.index.x}, ${endNode.index.y}]`)
        return [startNode];

    }

    /** Resets all closed nodes in the grid
     * 
     *  @author Jakob
     * 
     */

    resetGrid () {

        this.openHeap.clear();

        for (let row of this.grid) {

            for (let node of row) {

                node.isClosed = false;
                node.isVisited = false;
                node.h = 0;
                node.g = 0;
                node.f = 0;
                node.cost = 1;
                node.parent = null;

            }

        }

    }

}