import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Blog from './Blog';

test('renders title and author, but not url and likes by default', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 5,
    user: {
        username: 'testuser'
    }
  };

  const component = render(<Blog blog={blog} />);

  const div = component.container.querySelector('.blogItem');
  expect(div).toHaveTextContent('Test Blog');
  expect(div).toHaveTextContent('Test Author');
  expect(div).not.toHaveTextContent('http://test.com');
  expect(div).not.toHaveTextContent('5');
});

test('shows url and likes when the button is clicked', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 5,
      user: {
        username: 'testuser'
    }
    };
  
    const component = render(<Blog blog={blog} />);
  
    const button = component.getByText('Show more');
    fireEvent.click(button)
  
    const div = component.container.querySelector('.blogItem');
    expect(div).toHaveTextContent('http://test.com');
    expect(div).toHaveTextContent('5');
  });

  test('if the like button is clicked twice, the event handler is called twice', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 5,
      user: {
        username: 'testuser'
      }
    };
  
    const mockHandler = vi.fn();
  
    const { getByText } = render(<Blog blog={blog} onClick={mockHandler} />);
 // Click the 'Show more' button to reveal details
    const showMoreButton = getByText('Show more');
    fireEvent.click(showMoreButton);

    // Now the 'like' button should be visible
    const likeButton = getByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
  
    expect(mockHandler.mock.calls).toHaveLength(2);
  });