import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

export function SortableItem(props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({id: props.id});
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1, // Visual feedback for dragging
        zIndex: isDragging ? 100 : 'auto',
    };
    
    return (
        <div ref={setNodeRef} style={style} className='flex items-start group'>
            {/* Drag Handle */}
            <button 
                className='p-3 mt-4 text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab'
                {...listeners}
                {...attributes}
                aria-label="Drag to reorder section"
            >
                <GripVertical className='w-5 h-5'/>
            </button>
            {/* The actual content being dragged */}
            <div className='flex-1'>
                {props.children}
            </div>
        </div>
    );
}