import { tasks, deleteTask, updateTask, pushToArray } from '../js/script'

describe

describe('tasks', () => { 
    
    it('[tasks] to be defined', () => {
        expect(tasks).toBeDefined();
    });
    test('tasks added to array',()=>{
        pushToArray("Wake up")

        expect(tasks).toContain("Wake up")
    })
 })


 describe('deleteTask', () => { 
    
    it('[deleteTask] to be defined', () => {
        expect(tasks).toBeDefined();
    });
    test("test if an element is deleted",()=>{
        const tasks = ['Shopping']
        const deleteTask = (index) => {
            tasks.splice(index, 1);
        };

        deleteTask(0);
        expect(tasks).not.toContain("Shopping");
    })
 })

 
 describe('updateTask', () => { 
    
    it('[updateTask] to be defined', () => {
        expect(tasks).toBeDefined();
    });


 })