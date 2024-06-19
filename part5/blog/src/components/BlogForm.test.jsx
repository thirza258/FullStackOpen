import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

test('Note: calls event handler and received as props', () => {
    const createBlog = vi.fn();

    const component = render(<BlogForm createBlog={createBlog} />);
    
    const titleInput = component.getByLabelText('title:');
    const authorInput = component.getByLabelText('author:');
    const urlInput = component.getByLabelText('url:');
    const likesInput = component.getByLabelText('likes:');

    fireEvent.change(titleInput, {
        target: { value: 'Test Blog' }
    });

    fireEvent.change(authorInput, {
        target: { value: 'Test Author' }
    });

    fireEvent.change(urlInput, {
        target: { value: 'http://test.com' }
    });

    fireEvent.change(likesInput, {
        target: { value: '5' }
    });

    fireEvent.submit(component.container.querySelector('form'));

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe('Test Blog');
    expect(createBlog.mock.calls[0][0].author).toBe('Test Author');
    expect(createBlog.mock.calls[0][0].url).toBe('http://test.com');
    expect(createBlog.mock.calls[0][0].likes).toBe('5');
})